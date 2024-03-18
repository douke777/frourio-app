import { getUserWithProfile, upsertProfile } from '$/service/profiles';

import { defineController } from './$relay';

export default defineController(() => ({
  get: () => {
    // FIXME: sessionからuserIdを取得
    const userId = 1;
    const result = getUserWithProfile(userId);

    return result.match(
      (userWithProfile) => ({ status: 200, body: userWithProfile }),
      (error) => {
        throw error;
      },
    );
  },
  post: ({ body }) => {
    // FIXME: sessionからuserIdを取得
    const userId = 1;
    const result = upsertProfile(userId, body);

    return result.match(
      () => ({ status: 200 }),
      (error) => {
        throw error;
      },
    );
  },
}));
