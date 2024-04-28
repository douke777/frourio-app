import { BadRequestError } from '$/lib/error';
import { login } from '$/service/auth';
import { LoginDto } from '$/types/auth';

import { defineHooks } from './$relay';

export type AdditionalRequest = {
  body: LoginDto;
};

export default defineHooks((app) => ({
  preHandler: (req, reply, done) => {
    if (!req.body) throw new BadRequestError();

    const result = login(app, req.body);

    result.match(
      (jwt) => {
        reply.setCookie('access_token', jwt.accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          path: '/',
        });
        done();
      },
      (error) => {
        reply.send(error);
      },
    );
  },
}));
