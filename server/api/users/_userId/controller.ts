import { getUserById, updateUser } from '$/service/users';

import { defineController } from './$relay';

export default defineController({ getUserById, updateUser }, ({ getUserById, updateUser }) => ({
  get: ({ params: { userId } }) => {
    const result = getUserById(Number(userId));

    return result.match(
      (user) => ({ status: 200, body: user }),
      (error) => {
        throw error;
      },
    );
  },
  patch: ({ params: { userId }, body }) => {
    // FIXME: めっちゃ途中。適当に作った
    console.log('userId:', userId);
    console.log('dto:', body);

    const result = updateUser(Number(userId), body);

    return result.match(
      (user) => ({ status: 200, body: user }),
      (error) => {
        throw error;
      },
    );
  },
}));
