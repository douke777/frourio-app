import { getCategories } from '$/service/categories';

import { defineController } from './$relay';

export default defineController({ getCategories }, ({ getCategories }) => ({
  get: () => {
    const result = getCategories();

    return result.match(
      (categories) => ({ status: 200, body: categories }),
      (error) => {
        throw error;
      },
    );
  },
}));
