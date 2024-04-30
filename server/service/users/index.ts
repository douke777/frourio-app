import { User } from '@prisma/client';
import { ResultAsync } from 'neverthrow';
import { depend } from 'velona';

import { Err } from '$/lib/error';
import { CreatingUser, SafeUser, UserWithDetails } from '$/types/users';

import { prisma, handlePrismaError } from '..';

export const getUserById = depend(
  { prisma },
  ({ prisma }, userId: User['id']): ResultAsync<SafeUser, Err> => {
    return ResultAsync.fromPromise(
      prisma.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      }),
      (e) => handlePrismaError(e),
    );
  },
);

export const getUserWithDetails = depend(
  { prisma },
  ({ prisma }, userId: User['id']): ResultAsync<UserWithDetails, Err> => {
    return ResultAsync.fromPromise(
      prisma.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          profile: {
            select: {
              bio: true,
            },
          },
          posts: {
            take: 6,
            orderBy: {
              id: 'desc',
            },
          },
        },
      }),
      (e) => handlePrismaError(e),
    );
  },
);

export const createUser = depend(
  { prisma },
  ({ prisma }, dto: CreatingUser): ResultAsync<User, Err> => {
    return ResultAsync.fromPromise(
      prisma.user.create({
        data: {
          ...dto,
        },
      }),
      (e) => handlePrismaError(e),
    );
  },
);
// export function updateUser(userId: User['id'], dto: EditingUser): ResultAsync<User, Err> {
export const updateUser = depend(
  { prisma },
  ({ prisma }, userId: User['id'], dto: { name: string }): ResultAsync<User, Err> => {
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
  },
);

export const deleteUser = depend(
  { prisma },
  ({ prisma }, userId: User['id']): ResultAsync<User, Err> => {
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
  },
);
