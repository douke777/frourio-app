import { Post, User } from '@prisma/client';

import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    query: { userId: User['id']; postId: Post['id'] };
  };
  post: {
    reqBody: { userId: User['id']; postId: Post['id'] };
  };
}>;
