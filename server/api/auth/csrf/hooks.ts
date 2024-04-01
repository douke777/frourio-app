import { defineHooks } from './$relay';

export type AdditionalRequest = {
  csrfToken: string;
};

export default defineHooks(() => ({
  preHandler: (req, reply, done) => {
    req.csrfToken = reply.generateCsrf();

    done();
  },
}));
