import { signUp } from '$/service/auth';

import { defineController } from './$relay';

export default defineController({ signUp }, ({ signUp }) => ({
  post: async ({ body }) => {
    const result = signUp(body);

    return result.match(
      () => ({ status: 201, body: { message: 'User created' } }),
      (error) => {
        throw error;
      },
    );
  },
}));
