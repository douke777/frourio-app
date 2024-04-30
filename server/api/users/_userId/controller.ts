import { getUserWithDetails } from '$/service/users';

import { defineController } from './$relay';

export default defineController({ getUserWithDetails }, ({ getUserWithDetails }) => ({
  get: ({ params: { userId } }) => {
    const result = getUserWithDetails(Number(userId));

    return result.match(
      (user) => ({ status: 200, body: user }),
      (error) => {
        throw error;
      },
    );
  },
}));
