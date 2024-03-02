import { Post, User } from '@prisma/client';

import { CreatingPost } from '$/types/posts';

import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: Post[];
  };
  post: {
    reqBody: { authorId: User['id']; dto: CreatingPost };
    resBody: Post;
  };
}>;
