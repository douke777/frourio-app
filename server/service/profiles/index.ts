import { User } from '@prisma/client';
import { ResultAsync } from 'neverthrow';
import { depend } from 'velona';

import { Err } from '$/lib/error';
import { UpsertProfileDto, UserWithProfile } from '$/types/profiles';

import { prisma, handlePrismaError } from '..';

export const getUserWithProfile = depend(
  { prisma },
  ({ prisma }, userId: User['id']): ResultAsync<UserWithProfile, Err> => {
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
        },
      }),
      (e) => handlePrismaError(e),
    );
  },
);

export const upsertProfile = depend(
  { prisma },
  ({ prisma }, userId: User['id'], dto: UpsertProfileDto): ResultAsync<UserWithProfile, Err> => {
    return ResultAsync.fromPromise(
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: dto.name,
          profile: {
            upsert: {
              update: {
                bio: dto.bio,
              },
              create: {
                bio: dto.bio,
              },
            },
          },
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
        },
      }),
      (e) => handlePrismaError(e),
    );
  },
);
