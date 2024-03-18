import { User, Post } from '@prisma/client';
import { ResultAsync, errAsync, okAsync } from 'neverthrow';

import { BadRequestError, Err, NotFoundError } from '$/lib/error';
import { CreatingPost, EditingPost, PostWithDetails } from '$/types/posts';

import { handlePrismaError, prisma } from '..';

export function getNewPosts(): ResultAsync<PostWithDetails[], Err> {
  return ResultAsync.fromPromise(
    prisma.post.findMany({
      where: {
        published: true,
      },
      take: 24,
      orderBy: {
        id: 'desc',
      },
      include: {
        category: {
          select: {
            id: true,
            slug: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    }),
    (e) => handlePrismaError(e),
  ).andThen((posts) => (posts.length ? okAsync(posts) : errAsync(new NotFoundError())));
}

export function getPostsByCategory(
  categorySlug: Post['categorySlug'],
): ResultAsync<PostWithDetails[], Err> {
  return ResultAsync.fromPromise(
    prisma.post.findMany({
      where: {
        AND: [{ published: true }, { categorySlug }],
      },
      orderBy: {
        id: 'desc',
      },
      include: {
        category: {
          select: {
            id: true,
            slug: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    }),
    (e) => handlePrismaError(e),
  ).andThen((posts) => (posts.length ? okAsync(posts) : errAsync(new NotFoundError())));
}

export function getRelatedPosts(
  postId: Post['id'],
  categorySlug: Post['categorySlug'],
): ResultAsync<PostWithDetails[], Err> {
  return ResultAsync.fromPromise(
    prisma.post.findMany({
      where: {
        categorySlug,
        NOT: {
          id: postId,
        },
      },
      take: 3,
      orderBy: {
        id: 'desc',
      },
      include: {
        category: {
          select: {
            id: true,
            slug: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    }),
    (e) => handlePrismaError(e),
  ).andThen((posts) => (posts.length ? okAsync(posts) : errAsync(new NotFoundError())));
}

// TODO: getPostsBySearch

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
