import { defineController } from './$relay';

import { upsertProfile } from '$/features/profiles/api';

export default defineController(() => ({
  post: ({ body: { userId, dto } }) => {
    const result = upsertProfile(userId, dto);

    return result.match(
      () => ({ status: 200 }),
      (error) => {
        throw error;
      },
    );
  },
}));
