import { getUserById } from '$/service/users';

import { defineController } from './$relay';

export default defineController(() => ({
  get: ({ params: { userId } }) => {
    const result = getUserById(Number(userId));

    return result.match(
      (user) => ({ status: 200, body: user }),
      (error) => {
        throw error;
      },
    );
  },
}));
