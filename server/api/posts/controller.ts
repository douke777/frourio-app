import { verifyJwtToken } from '$/service/auth';
import { createPost, getNewPosts } from '$/service/posts';
import { JwtPayload } from '$/types/auth';

import { defineController } from './$relay';

export type AdditionalRequest = {
  user: JwtPayload;
};

export default defineController(() => ({
  get: () => {
    const result = getNewPosts();

    return result.match(
      (posts) => ({ status: 200, body: posts }),
      (error) => {
        throw error;
      },
    );
  },
  post: {
    hooks: {
      onRequest: verifyJwtToken,
    },
    handler: ({ body, user }) => {
      const authorId = user.sub;
      const result = createPost(authorId, body);

      return result.match(
        (post) => ({ status: 201, body: post }),
        (error) => {
          throw error;
        },
      );
    },
  },
}));
