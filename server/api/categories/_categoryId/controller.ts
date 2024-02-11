import { getCategoryById } from 'features/categories/api';

import { defineController } from './$relay';

export default defineController(() => ({
  get: ({ params: { categoryId } }) => {
    const result = getCategoryById(Number(categoryId));

    return result.match(
      (category) => ({ status: 200, body: category }),
      (error) => {
        throw error;
      },
    );
  },
}));
