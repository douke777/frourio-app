import { User } from '@prisma/client';
import { ResultAsync } from 'neverthrow';

import { Err } from 'lib/error';

import { handlePrismaError, prisma } from '../..';
import { CreatingUser, EditingUser } from '../types';

export function getUserById(userId: User['id']): ResultAsync<User, Err> {
  return ResultAsync.fromPromise(
    prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    }),
    (e) => handlePrismaError(e),
  );
}

export const createUser = (dto: CreatingUser): ResultAsync<User, Err> => {
  return ResultAsync.fromPromise(
    prisma.user.create({
      data: {
        ...dto,
      },
    }),
    (e) => handlePrismaError(e),
  );
};

export function updateUser(userId: User['id'], dto: EditingUser): ResultAsync<User, Err> {
  return ResultAsync.fromPromise(
    prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    }),
    (e) => handlePrismaError(e),
  ).andThen((user) =>
    ResultAsync.fromPromise(
      prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...dto,
        },
      }),
      (e) => handlePrismaError(e),
    ),
  );
}

export function deleteUser(userId: User['id']): ResultAsync<User, Err> {
  return ResultAsync.fromPromise(
    prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    }),
    (e) => handlePrismaError(e),
  ).andThen((user) =>
    ResultAsync.fromPromise(
      prisma.user.delete({
        where: {
          id: user.id,
        },
      }),
      (e) => handlePrismaError(e),
    ),
  );
}
