import { prisma } from '$/service';
import { login } from '$/service/auth';
import { LoginDto } from '$/types/auth';

import { defineHooks } from './$relay';

export type AdditionalRequest = {
  body: LoginDto;
};

export default defineHooks((app) => ({
  preHandler: async (req, reply) => {
    if (!req.body) {
      reply.status(400);

      return;
    }

    const jwt = await login(prisma)(app, req.body);
    reply.setCookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: false, // TODO: true
      sameSite: 'none',
      path: '/',
    });
  },
}));
