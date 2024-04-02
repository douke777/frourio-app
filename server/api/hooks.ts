import { defineHooks } from './$relay';

export default defineHooks((app) => ({
  preParsing: (req, reply, _payload, done) => {
    if (req.method === 'GET') {
      done();

      return;
    }

    app.csrfProtection(req, reply, done);
  },
}));
