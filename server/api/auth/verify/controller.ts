import { verifyJwtToken } from '$/service/auth';
import { getUserById } from '$/service/users';
import { JwtPayload } from '$/types/auth';

import { defineController } from './$relay';

export type AdditionalRequest = {
  user: JwtPayload;
};

export default defineController(() => ({
  get: {
    hooks: {
      onRequest: verifyJwtToken,
    },
    handler: ({ user }) => {
      const userId = user.sub;
      const result = getUserById(userId);

      return result.match(
        (user) => ({ status: 200, body: user }),
        (error) => {
          throw error;
        },
      );
    },
  },
}));
