import { upsertProfileDto, userWithProfileFactory } from '$/__test__/factories';

import { getUserWithProfile, upsertProfile } from '.';

const prisma = jestPrisma.client;

describe('getUserWithProfile', () => {
  const injectedGetUserWithProfile = getUserWithProfile.inject({ prisma });

  it('returns the user with profile for a given id', async () => {
    const userWithProfile = await userWithProfileFactory(prisma);
    const result = await injectedGetUserWithProfile(userWithProfile.id);

    expect(result._unsafeUnwrap()).toEqual(userWithProfile);
  });
});

describe('upsertProfile', () => {
  const injectedUpsertProfile = upsertProfile.inject({ prisma });

  it('updates or inserts a profile for a given user id', async () => {
    const userWithProfile = await userWithProfileFactory(prisma);
    const result = await injectedUpsertProfile(userWithProfile.id, upsertProfileDto);

    expect(result._unsafeUnwrap()).toEqual({
      ...userWithProfile,
      name: upsertProfileDto.name,
      profile: {
        bio: upsertProfileDto.bio,
      },
    });
  });
});
