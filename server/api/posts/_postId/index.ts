import { Post, User } from '@prisma/client';

import { EditingPost } from '$/types/posts';

import type { DefineMethods } from 'aspida';

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
