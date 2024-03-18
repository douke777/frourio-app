import { EditingUserWithProfile, UserWithProfile } from '$/types/profiles';

import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: UserWithProfile;
  };
  post: {
    reqBody: EditingUserWithProfile;
  };
}>;
