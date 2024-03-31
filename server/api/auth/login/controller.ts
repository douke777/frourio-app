import { defineController } from './$relay';

export default defineController(() => ({
  post: () => {
    return { status: 200, body: { message: 'ok' } };
  },
}));
