import { EditingPost, PostWithDetails } from '$/types/posts';

import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: PostWithDetails;
  };
  patch: {
    reqBody: Omit<EditingPost, 'id'>;
  };
  delete: {};
}>;
