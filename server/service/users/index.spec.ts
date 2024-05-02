import { userFactory } from '$/__test__/factories';

import { getUserById } from '.';

const prisma = jestPrisma.client;

describe('getUserById', () => {
  const injectedGetUserById = getUserById.inject({ prisma });

  it('returns the user for a given id', async () => {
    const user = await userFactory(prisma);
    const result = await injectedGetUserById(user.id);

    expect(result._unsafeUnwrap()).toEqual(user);
  });
});
