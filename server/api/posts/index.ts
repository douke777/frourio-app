import { Post, User } from '@prisma/client';

import type { DefineMethods } from 'aspida';

import { CreatingPost } from '$/features/posts/types';

export type Methods = DefineMethods<{
  get: {
    resBody: Post[];
  };
  post: {
    reqBody: { authorId: User['id']; dto: CreatingPost };
    resBody: Post;
  };
}>;
