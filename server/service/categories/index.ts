import { Category } from '@prisma/client';
import { ResultAsync, errAsync, okAsync } from 'neverthrow';
import { depend } from 'velona';

import { Err, NotFoundError } from '$/lib/error';
import { CategoryWithDetails } from '$/types/categories';

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
  ({ prisma }, id: Category['id']): ResultAsync<CategoryWithDetails, Err> => {
    return ResultAsync.fromPromise(
      prisma.category.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          posts: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      }),
      (e) => handlePrismaError(e),
    );
  },
);
