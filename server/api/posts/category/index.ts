import { PostWithDetails } from '$/types';

import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    query: { categorySlug: string };
    resBody: PostWithDetails[];
  };
}>;
