import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    resBody: { message: string };
  };
}>;
