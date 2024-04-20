import { getLatestPosts } from '$/service/posts';

import { defineController } from './$relay';

export default defineController(() => ({
  get: () => {
    const result = getLatestPosts();

    return result.match(
      (latestPosts) => ({ status: 200, body: latestPosts }),
      (error) => {
        throw error;
      },
    );
  },
}));
