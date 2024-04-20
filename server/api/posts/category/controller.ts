import { getPostsByCategory } from '$/service/posts';

import { defineController } from './$relay';

export default defineController(() => ({
  get: ({ query: { categorySlug } }) => {
    const result = getPostsByCategory(categorySlug);

    return result.match(
      (posts) => ({ status: 200, body: posts }),
      (error) => {
        throw error;
      },
    );
  },
}));
