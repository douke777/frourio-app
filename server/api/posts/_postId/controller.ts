import { defineController } from './$relay';

import { deletePost, getPostById, updatePost } from '$/features/posts/api';

export default defineController(() => ({
  get: ({ params: { postId } }) => {
    const result = getPostById(Number(postId));

    return result.match(
      (post) => ({ status: 200, body: post }),
      (error) => {
        throw error;
      },
    );
  },
  patch: ({ params: { postId }, body: { authorId, dto } }) => {
    const result = updatePost(authorId, Number(postId), dto);

    return result.match(
      () => ({ status: 200 }),
      (error) => {
        throw error;
      },
    );
  },
  delete: ({ params: { postId }, body: { authorId } }) => {
    const result = deletePost(authorId, Number(postId));

    return result.match(
      () => ({ status: 204 }),
      (error) => {
        throw error;
      },
    );
  },
}));
