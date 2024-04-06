import { defineHooks } from './$relay';

export default defineHooks((app) => ({
  preParsing: (req, reply, _payload, done) => {
    if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
      done();

      return;
    }

    app.csrfProtection(req, reply, done);
  },
}));
