import { defineController } from './$relay';

export default defineController(() => ({
  get: ({ csrfToken }) => ({ status: 200, body: { csrfToken } }),
}));
