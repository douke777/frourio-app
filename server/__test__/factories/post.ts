import { faker } from '@faker-js/faker';

import { userFactory } from './user';
import { JestPrisma } from '../types/prisma';

export const postData = {
  title: faker.lorem.word(),
  content: faker.lorem.sentence(),
  published: true,
  categorySlug: 'programming',
};

export const postFactory = async (prisma: JestPrisma) => {
  const user = await userFactory(prisma);

  return await prisma.post.create({
    data: { ...postData, authorId: user.id },
  });
};
