import { LoginDto } from '$/types/auth';

import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    reqBody: LoginDto;
    resBody: { message: string };
  };
}>;
