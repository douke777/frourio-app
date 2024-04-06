import { signUp } from '$/service/auth';

import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    const result = await signUp(body);

    return { status: 201, message: result.message };
  },
}));
