import { User, Post, Like, Prisma } from '@prisma/client';
import { ResultAsync, errAsync, okAsync } from 'neverthrow';

import { Err, NotFoundError } from '$/lib/error';

import { handlePrismaError, prisma } from '..';

export function getLike(userId: User['id'], postId: Post['id']): ResultAsync<Like, Err> {
  return ResultAsync.fromPromise(
    prisma.like.findFirst({
      where: {
        userId,
        postId,
      },
    }),
    (e) => handlePrismaError(e),
  ).andThen((like) => (like ? okAsync(like) : errAsync(new NotFoundError())));
}

export function toggleLike(
  userId: User['id'],
  postId: Post['id'],
): ResultAsync<Like | Prisma.BatchPayload, Err> {
  return ResultAsync.fromPromise(
    prisma.like.findFirst({
      where: {
        userId,
        postId,
      },
    }),
    (e) => handlePrismaError(e),
  ).andThen((like) =>
    like
      ? ResultAsync.fromPromise(
          prisma.like.deleteMany({
            where: {
              AND: [{ postId }, { userId }],
            },
          }),
          (e) => handlePrismaError(e),
        )
      : ResultAsync.fromPromise(
          prisma.like.create({
            data: {
              userId,
              postId,
            },
          }),
          (e) => handlePrismaError(e),
        ),
  );
}
