import { defineUserFactory } from '$/src/__generated__/fabbrica';

import { getUserById } from '.';

const prisma = jestPrisma.client;
const userFactory = defineUserFactory();

describe('getUserById', () => {
  const injectedGetUserById = getUserById.inject({ prisma });

  it('returns the user for a given id', async () => {
    const user = await userFactory.create();
    const result = await injectedGetUserById(user.id);

    expect(result._unsafeUnwrap()).toEqual(
      expect.objectContaining({
        email: user.email,
        id: user.id,
        image: user.image,
        name: user.name,
      }),
    );
  });
});
