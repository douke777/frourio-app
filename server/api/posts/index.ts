import { Post } from '@prisma/client';

import { CreatingPost, PostWithDetails } from '$/types/posts';

import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: PostWithDetails[];
  };
  post: {
    reqBody: CreatingPost;
    resBody: Post;
  };
}>;
