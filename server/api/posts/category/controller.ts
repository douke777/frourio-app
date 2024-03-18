import { defineController } from './$relay';

export default defineController(() => ({
  get: ({ query }) => {
    const limit = query?.limit;
    if (limit) {
      return { status: 200, body: String(query?.limit) };
    }

    return { status: 200, body: 'aaa' };
  },
}));
