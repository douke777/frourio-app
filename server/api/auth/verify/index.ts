import { SafeUser } from '$/types';

import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: SafeUser;
  };
}>;
