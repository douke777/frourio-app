import { Category, Post, User } from '@prisma/client';
import { ResultAsync, errAsync, okAsync } from 'neverthrow';
import { depend } from 'velona';

import { Err, NotFoundError } from '$/lib/error';

import { prisma, handlePrismaError } from '..';

export const getCategories = depend({ prisma }, ({ prisma }): ResultAsync<Category[], Err> => {
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
});

export const getCategoryById = depend(
  { prisma },
  (
    { prisma },
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
  },
);
