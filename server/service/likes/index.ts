import { User, Post, Like, Prisma } from '@prisma/client';
import { ResultAsync, okAsync } from 'neverthrow';
import { depend } from 'velona';

import { Err } from '$/lib/error';

import { prisma, handlePrismaError } from '..';

export const getLike = depend(
  { prisma },
  ({ prisma }, userId: User['id'], postId: Post['id']): ResultAsync<Like | null, Err> => {
    return ResultAsync.fromPromise(
      prisma.like.findFirst({
        where: {
          userId,
          postId,
        },
      }),
      (e) => handlePrismaError(e),
    ).andThen((like) => okAsync(like));
  },
);

export const toggleLike = depend(
  { prisma },
  (
    { prisma },
    userId: User['id'],
    postId: Post['id'],
  ): ResultAsync<Like | Prisma.BatchPayload, Err> => {
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
  },
);
