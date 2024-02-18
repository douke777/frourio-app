import { User } from '@prisma/client';

import type { DefineMethods } from 'aspida';

import { EditingProfile } from '$/features/profiles/types';

export type Methods = DefineMethods<{
  post: {
    reqBody: { userId: User['id']; dto: EditingProfile };
  };
}>;
