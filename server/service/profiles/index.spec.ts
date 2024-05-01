import { upsertProfileDto, userWithProfileFactory } from '$/__test__/factories';
import { UserWithProfile } from '$/types';

import { getUserWithProfile, upsertProfile } from '.';

const prisma = jestPrisma.client;

describe('getUserWithProfile', () => {
  const injectedGetUserWithProfile = getUserWithProfile.inject({ prisma });

  let userWithProfile: UserWithProfile;

  beforeEach(async () => {
    userWithProfile = await userWithProfileFactory(prisma);
  });

  it('Success', async () => {
    const result = await injectedGetUserWithProfile(userWithProfile.id);

    expect(result._unsafeUnwrap()).toEqual(userWithProfile);
  });
});

describe('upsertProfile', () => {
  const injectedUpsertProfile = upsertProfile.inject({ prisma });

  let userWithProfile: UserWithProfile;

  beforeEach(async () => {
    userWithProfile = await userWithProfileFactory(prisma);
  });

  it('Success', async () => {
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
