import { Category, Post, PrismaClient, User } from '@prisma/client';
import { ResultAsync, errAsync, okAsync } from 'neverthrow';

import { Err, NotFoundError } from '$/lib/error';

import { handlePrismaError } from '..';

export const getCategories = (prisma: PrismaClient): ResultAsync<Category[], Err> => {
  return ResultAsync.fromPromise(
    prisma.category.findMany({
      orderBy: {
        id: 'asc',
      },
    }),
    (e) => handlePrismaError(e),
  ).andThen((categories) =>
    categories.length ? okAsync(categories) : errAsync(new NotFoundError()),
  );
};

export const getCategoryById =
  (prisma: PrismaClient) =>
  (
    id: Category['id'],
  ): ResultAsync<
    Category & {
      posts: (Post & {
        author: User;
      })[];
    },
    Err
  > => {
    return ResultAsync.fromPromise(
      prisma.category.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          posts: {
            include: {
              author: true,
            },
          },
        },
      }),
      (e) => handlePrismaError(e),
    );
  };
