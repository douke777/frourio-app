import { defineHooks } from './$relay';

export default defineHooks(() => ({
  preHandler: (_req, reply, done) => {
    reply.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    done();
  },
}));
