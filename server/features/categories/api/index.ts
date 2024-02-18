import { Category, Post, User } from '@prisma/client';
import { ResultAsync, errAsync, okAsync } from 'neverthrow';

import { handlePrismaError, prisma } from '../..';

import { Err, NotFoundError } from '$/lib/error';

export function getCategories(): ResultAsync<Category[], Err> {
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
}

export function getCategoryById(id: Category['id']): ResultAsync<
  Category & {
    posts: (Post & {
      author: User;
    })[];
  },
  Err
> {
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
}
