import { Category, Post, User } from '@prisma/client';

import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: Category & {
      posts: (Post & {
        author: User;
      })[];
    };
  };
}>;
