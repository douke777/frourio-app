import { Profile, User } from '@prisma/client';
import { ResultAsync } from 'neverthrow';

import { Err } from '$/lib/error';
import { EditingProfile } from '$/types/profiles';

import { handlePrismaError, prisma } from '..';

export const upsertProfile = (
  userId: User['id'],
  dto: EditingProfile,
): ResultAsync<Profile, Err> => {
  return ResultAsync.fromPromise(
    prisma.profile.upsert({
      where: {
        userId,
      },
      update: {
        ...dto,
      },
      create: {
        ...dto,
        userId,
      },
    }),
    (e) => handlePrismaError(e),
  );
};

// profileのReadは、users側で行う
