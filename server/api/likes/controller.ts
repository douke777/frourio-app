import { prisma } from '$/service';
import { getLike, toggleLike } from '$/service/likes';

import { defineController } from './$relay';

export default defineController(() => ({
  get: ({ query: { postId }, user }) => {
    const userId = user.sub;
    const result = getLike(prisma)(userId, postId);

    return result.match(
      () => ({ status: 200 }),
      (error) => {
        throw error;
      },
    );
  },
  post: ({ body: { postId }, user }) => {
    const userId = user.sub;
    const result = toggleLike(prisma)(userId, postId);

    return result.match(
      () => ({ status: 200 }),
      (error) => {
        throw error;
      },
    );
  },
}));
