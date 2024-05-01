import { userFactory } from '$/__test__/factories';
import { SafeUser } from '$/types';

import { getUserById } from '.';

const prisma = jestPrisma.client;

describe('getUserById', () => {
  const injectedGetUserById = getUserById.inject({ prisma });

  let user: SafeUser;

  beforeEach(async () => {
    user = await userFactory(prisma);
  });

  it('Success', async () => {
    const result = await injectedGetUserById(user.id);

    expect(result._unsafeUnwrap()).toEqual(user);
  });
});
