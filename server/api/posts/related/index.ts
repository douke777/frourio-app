import { PostWithDetails } from '$/types';

import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    query: { postId: number };
    resBody: PostWithDetails[];
  };
}>;
