import { getUserWithProfile, upsertProfile } from '$/service/profiles';

import { defineController } from './$relay';

export default defineController(() => ({
  get: ({ user }) => {
    const userId = user.sub;
    const result = getUserWithProfile(userId);

    return result.match(
      (userWithProfile) => ({ status: 200, body: userWithProfile }),
      (error) => {
        throw error;
      },
    );
  },
  post: ({ body, user }) => {
    const userId = user.sub;
    const result = upsertProfile(userId, body);

    return result.match(
      () => ({ status: 200 }),
      (error) => {
        throw error;
      },
    );
  },
}));
