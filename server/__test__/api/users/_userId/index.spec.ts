import fastify from 'fastify';

import { userFactory } from '$/__test__/factories';
import controller from '$/api/users/_userId/controller';

const app = fastify();
const prisma = jestPrisma.client;

describe('hogehoge', () => {
  it('fugafuga', async () => {
    const user = await userFactory(prisma);
    const injectedController = controller.inject((deps) => ({
      getUserWithDetails: deps.getUserWithDetails.inject({
        prisma,
      }),
    }))(app);

    const res = await injectedController.get({ params: { userId: String(user.id) } });

    expect(res.status).toBe(200);
  });
});
