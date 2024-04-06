import { verifyJwtToken } from '$/service/auth';
import { deletePost, getPostById, updatePost } from '$/service/posts';
import { JwtPayload } from '$/types/auth';

import { defineController } from './$relay';

export type AdditionalRequest = {
  user: JwtPayload;
};

export default defineController(
  { deletePost, getPostById, updatePost },
  ({ deletePost, getPostById, updatePost }) => ({
    get: ({ params: { postId } }) => {
      const result = getPostById(Number(postId));

      return result.match(
        (post) => ({ status: 200, body: post }),
        (error) => {
          throw error;
        },
      );
    },
    patch: {
      hooks: {
        preHandler: verifyJwtToken,
      },
      handler: ({ params: { postId }, body, user }) => {
        const authorId = user.sub;
        const result = updatePost(authorId, Number(postId), body);

        return result.match(
          () => ({ status: 200 }),
          (error) => {
            throw error;
          },
        );
      },
    },
    delete: {
      hooks: {
        preHandler: verifyJwtToken,
      },
      handler: ({ params: { postId }, user }) => {
        const authorId = user.sub;
        const result = deletePost(authorId, Number(postId));

        return result.match(
          () => ({ status: 204 }),
          (error) => {
            throw error;
          },
        );
      },
    },
  }),
);
