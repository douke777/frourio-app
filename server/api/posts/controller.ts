import { defineController } from './$relay';

import { createPost, getPosts } from '$/features/posts/api';

export default defineController(() => ({
  get: () => {
    const result = getPosts();

    return result.match(
      (posts) => ({ status: 200, body: posts }),
      (error) => {
        throw error;
      },
    );
  },
  post: ({ body: { authorId, dto } }) => {
    const result = createPost(authorId, dto);

    return result.match(
      (post) => ({ status: 201, body: post }),
      (error) => {
        throw error;
      },
    );
  },
}));
