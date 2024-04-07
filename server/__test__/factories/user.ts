import { faker } from '@faker-js/faker';

import { JestPrisma } from '../types/prisma';

export const userData = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

export const userFactory = async (prisma: JestPrisma) => {
  return await prisma.user.create({
    data: { ...userData },
  });
};
