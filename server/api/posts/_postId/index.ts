import { Post } from '@prisma/client';

import { EditingPost } from '$/types/posts';

import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: Post;
  };
  patch: {
    reqBody: Omit<EditingPost, 'id'>;
  };
  delete: {};
}>;
