import { getPostsBySearch } from '$/service/posts';

import { defineController } from './$relay';

export default defineController({ getPostsBySearch }, ({ getPostsBySearch }) => ({
  get: ({ query: { q } }) => {
    const result = getPostsBySearch(q);

    return result.match(
      (posts) => ({ status: 200, body: posts }),
      (error) => {
        throw error;
      },
    );
  },
}));
