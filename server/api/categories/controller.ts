import { prisma } from '$/service';
import { getCategories } from '$/service/categories';

import { defineController } from './$relay';

export default defineController(() => ({
  get: () => {
    const result = getCategories(prisma);

    return result.match(
      (categories) => ({ status: 200, body: categories }),
      (error) => {
        throw error;
      },
    );
  },
}));
