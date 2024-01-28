import { User, Post } from '@prisma/client';
import { ResultAsync, errAsync, okAsync } from 'neverthrow';

import { BadRequestError, Err, NotFoundError } from 'lib/error';

import { handlePrismaError, prisma } from '../..';
import { CreatingPost, EditingPost } from '../types';

export function getPosts(authorId: User['id']): ResultAsync<Post[], Err> {
  return ResultAsync.fromPromise(
    prisma.post.findMany({
      where: {
        authorId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    (e) => handlePrismaError(e),
  ).andThen((posts) => (posts.length ? okAsync(posts) : errAsync(new NotFoundError())));
}

export function getPostById(authorId: User['id'], postId: Post['id']): ResultAsync<Post, Err> {
  return ResultAsync.fromPromise(
    prisma.post.findUniqueOrThrow({
      where: {
        authorId,
        id: postId,
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
