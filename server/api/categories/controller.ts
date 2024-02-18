import { defineController } from './$relay';

import { getCategories } from '$/features/categories/api';

export default defineController(() => ({
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
