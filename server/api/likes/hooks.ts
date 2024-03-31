import { verifyJwtToken } from '$/service/auth';
import { JwtPayload } from '$/types/auth';

import { defineHooks } from './$relay';

export type AdditionalRequest = {
  user: JwtPayload;
};

export default defineHooks(() => ({
  onRequest: verifyJwtToken,
}));
