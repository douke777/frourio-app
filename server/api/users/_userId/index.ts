import { User } from '@prisma/client';

import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: User;
  };
  patch: {
    reqBody: {
      // FIXME
      name: string;
    };
  };
}>;
