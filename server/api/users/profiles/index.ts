import { User } from '@prisma/client';
import { EditingProfile } from 'features/profiles/types';

import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    reqBody: { userId: User['id']; dto: EditingProfile };
  };
}>;
