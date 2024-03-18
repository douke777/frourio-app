import { User } from '@prisma/client';
import { ResultAsync } from 'neverthrow';

import { Err } from '$/lib/error';
import { EditingUserWithProfile, UserWithProfile } from '$/types/profiles';

import { handlePrismaError, prisma } from '..';

export const getUserWithProfile = (userId: User['id']): ResultAsync<UserWithProfile, Err> => {
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
};

export const upsertProfile = (
  userId: User['id'],
  dto: EditingUserWithProfile,
): ResultAsync<UserWithProfile, Err> => {
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
};
