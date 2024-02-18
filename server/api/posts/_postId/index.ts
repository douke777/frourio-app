import { Post, User } from '@prisma/client';

import type { DefineMethods } from 'aspida';

import { EditingPost } from '$/features/posts/types';

export type Methods = DefineMethods<{
  get: {
    resBody: Post;
  };
  patch: {
    reqBody: { authorId: User['id']; dto: Omit<EditingPost, 'id'> };
  };
  delete: {
    reqBody: { authorId: User['id'] };
  };
}>;
