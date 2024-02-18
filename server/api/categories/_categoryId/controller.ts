import { defineController } from './$relay';

import { getCategoryById } from '$/features/categories/api';

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
