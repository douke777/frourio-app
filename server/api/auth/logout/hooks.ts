import { defineHooks } from './$relay';

export default defineHooks(() => ({
  preHandler: (_req, reply, done) => {
    reply.clearCookie('access_token', {
      httpOnly: true,
      secure: false, // TODO: true
      sameSite: 'none',
      path: '/',
    });
    done();
  },
}));
