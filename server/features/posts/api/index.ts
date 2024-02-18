import { User, Post } from '@prisma/client';
import { ResultAsync, errAsync, okAsync } from 'neverthrow';

import { handlePrismaError, prisma } from '../..';
import { CreatingPost, EditingPost } from '../types';

import { BadRequestError, Err, NotFoundError } from '$/lib/error';

export function getPosts(): ResultAsync<Post[], Err> {
  return ResultAsync.fromPromise(
    prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    (e) => handlePrismaError(e),
  ).andThen((posts) => (posts.length ? okAsync(posts) : errAsync(new NotFoundError())));
}

export function getPostById(postId: Post['id']): ResultAsync<Post, Err> {
  return ResultAsync.fromPromise(
    prisma.post.findUniqueOrThrow({
      where: {
        id: postId,
        published: true,
      },
    }),
    (e) => handlePrismaError(e),
  );
}

export const createPost = (authorId: User['id'], dto: CreatingPost): ResultAsync<Post, Err> => {
  return ResultAsync.fromPromise(
    prisma.post.create({
      data: {
        ...dto,
        authorId,
      },
    }),
    (e) => handlePrismaError(e),
  );
};

export function updatePost(
  authorId: User['id'],
  postId: Post['id'],
  dto: Omit<EditingPost, 'id'>,
): ResultAsync<Post, Err> {
  return ResultAsync.fromPromise(
    prisma.post.findUnique({
      where: {
        id: postId,
      },
    }),
    (e) => handlePrismaError(e),
  ).andThen((post) =>
    !post || post.authorId !== authorId
      ? errAsync(new BadRequestError())
      : ResultAsync.fromPromise(
          prisma.post.update({
            where: {
              id: postId,
            },
            data: {
              ...dto,
            },
          }),
          (e) => handlePrismaError(e),
        ),
  );
}

export function deletePost(authorId: User['id'], postId: Post['id']): ResultAsync<Post, Err> {
  return ResultAsync.fromPromise(
    prisma.post.findUnique({
      where: {
        id: postId,
      },
    }),
    (e) => handlePrismaError(e),
  ).andThen((post) =>
    !post || post.authorId !== authorId
      ? errAsync(new BadRequestError())
      : ResultAsync.fromPromise(
          prisma.post.delete({
            where: {
              id: postId,
            },
          }),
          (e) => handlePrismaError(e),
        ),
  );
}
