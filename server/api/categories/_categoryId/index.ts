import { CategoryWithDetails } from '$/types/categories';

import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: CategoryWithDetails;
  };
}>;
