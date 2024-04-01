import { PrismaClient, User } from '@prisma/client';
import { ResultAsync } from 'neverthrow';

import { Err } from '$/lib/error';
import { CreatingUser } from '$/types/users';

import { handlePrismaError } from '..';

// TODO: passwordとかをomitする

export const getUserById =
  (prisma: PrismaClient) =>
  (userId: User['id']): ResultAsync<User, Err> => {
    return ResultAsync.fromPromise(
      prisma.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
      }),
      (e) => handlePrismaError(e),
    );
  };

export const createUser =
  (prisma: PrismaClient) =>
  (dto: CreatingUser): ResultAsync<User, Err> => {
    return ResultAsync.fromPromise(
      prisma.user.create({
        data: {
          ...dto,
        },
      }),
      (e) => handlePrismaError(e),
    );
  };

// export function updateUser(userId: User['id'], dto: EditingUser): ResultAsync<User, Err> {
export const updateUser =
  (prisma: PrismaClient) =>
  (userId: User['id'], dto: { name: string }): ResultAsync<User, Err> => {
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
  };

export const deleteUser =
  (prisma: PrismaClient) =>
  (userId: User['id']): ResultAsync<User, Err> => {
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
  };
