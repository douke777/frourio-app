import { defineHooks } from './$relay';

export default defineHooks((app) => ({
  onRequest: (req, reply, done) => {
    if (req.method !== 'GET') {
      app.csrfProtection(req, reply, done);
    }

    done();
  },
}));
