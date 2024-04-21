import { getRelatedPosts } from '$/service/posts';

import { defineController } from './$relay';

export default defineController({ getRelatedPosts }, ({ getRelatedPosts }) => ({
  get: ({ query: { postId } }) => {
    const result = getRelatedPosts(postId);

    return result.match(
      (relatedPosts) => ({ status: 200, body: relatedPosts }),
      (error) => {
        throw error;
      },
    );
  },
}));
