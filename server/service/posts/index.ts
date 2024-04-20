import { User, Post } from '@prisma/client';
import { ResultAsync, errAsync, okAsync } from 'neverthrow';
import { depend } from 'velona';

import { BadRequestError, Err } from '$/lib/error';
import { CreatingPost, EditingPost, PostWithDetails } from '$/types/posts';

import { prisma, handlePrismaError } from '..';

export const getNewPosts = depend({ prisma }, ({ prisma }): ResultAsync<PostWithDetails[], Err> => {
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
  ).andThen((posts) => okAsync(posts));
});

export const getPostsByCategory = depend(
  { prisma },
  ({ prisma }, categorySlug: Post['categorySlug']): ResultAsync<PostWithDetails[], Err> => {
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
    ).andThen((posts) => okAsync(posts));
  },
);

export const getRelatedPosts = depend(
  { prisma },
  ({ prisma }, postId: Post['id']): ResultAsync<PostWithDetails[], Err> => {
    return ResultAsync.fromPromise(
      prisma.post.findUniqueOrThrow({
        where: {
          id: postId,
        },
        select: {
          categorySlug: true,
        },
      }),
      (e) => handlePrismaError(e),
    )
      .andThen((post) =>
        ResultAsync.fromPromise(
          prisma.post.findMany({
            where: {
              categorySlug: post.categorySlug,
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
        ),
      )
      .andThen((posts) => okAsync(posts));
  },
);

// TODO: getPostsBySearch

export const getPostById = depend(
  { prisma },
  ({ prisma }, postId: Post['id']): ResultAsync<Post, Err> => {
    return ResultAsync.fromPromise(
      prisma.post.findUniqueOrThrow({
        where: {
          id: postId,
          published: true,
        },
      }),
      (e) => handlePrismaError(e),
    );
  },
);

export const createPost = depend(
  { prisma },
  ({ prisma }, authorId: User['id'], dto: CreatingPost): ResultAsync<Post, Err> => {
    return ResultAsync.fromPromise(
      prisma.post.create({
        data: {
          ...dto,
          authorId,
        },
      }),
      (e) => handlePrismaError(e),
    );
  },
);

export const updatePost = depend(
  { prisma },
  (
    { prisma },
    authorId: User['id'],
    postId: Post['id'],
    dto: Omit<EditingPost, 'id'>,
  ): ResultAsync<Post, Err> => {
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
  },
);

export const deletePost = depend(
  { prisma },
  ({ prisma }, authorId: User['id'], postId: Post['id']): ResultAsync<Post, Err> => {
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
  },
);
