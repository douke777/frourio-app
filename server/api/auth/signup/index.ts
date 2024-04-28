import { SignUpDto } from '$/types/auth';

import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    reqBody: SignUpDto;
    resBody: { message: string };
  };
}>;
