import { verifyJwtToken } from '$/service/auth';
import { createPost, getLatestPosts } from '$/service/posts';
import { JwtPayload } from '$/types/auth';

import { defineController } from './$relay';

export type AdditionalRequest = {
  user: JwtPayload;
};

export default defineController(
  { createPost, getLatestPosts },
  ({ createPost, getLatestPosts }) => ({
    get: () => {
      const result = getLatestPosts();

      return result.match(
        (latestPosts) => ({ status: 200, body: latestPosts }),
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
  }),
);
