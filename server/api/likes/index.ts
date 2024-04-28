import { Post } from '@prisma/client';

import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    query: { postId: Post['id'] };
    resBody: boolean;
  };
  post: {
    reqBody: { postId: Post['id'] };
  };
}>;
