import { getLike, toggleLike } from '$/service/likes';

import { defineController } from './$relay';

export default defineController({ getLike, toggleLike }, ({ getLike, toggleLike }) => ({
  get: ({ query: { postId }, user }) => {
    const userId = user.sub;
    const result = getLike(userId, postId);

    return result.match(
      () => ({ status: 200 }),
      (error) => {
        throw error;
      },
    );
  },
  post: ({ body: { postId }, user }) => {
    const userId = user.sub;
    const result = toggleLike(userId, postId);

    return result.match(
      () => ({ status: 200 }),
      (error) => {
        throw error;
      },
    );
  },
}));
