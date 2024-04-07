import { faker } from '@faker-js/faker';
import { Post } from '@prisma/client';

import { getPostById } from '.';

const prisma = jestPrisma.client;

describe('getPostById', () => {
  const injectedGetPostById = getPostById.inject({ prisma });

  let post: Post;

  beforeEach(async () => {
    // TODO: factory
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });

    post = await prisma.post.create({
      data: {
        title: faker.lorem.word(),
        content: faker.lorem.sentence(),
        published: true,
        categorySlug: 'programming',
        authorId: user.id,
      },
    });
  });

  it('Success', async () => {
    const result = await injectedGetPostById(post.id);

    expect(result._unsafeUnwrap()).toEqual(post);
  });

  it('NotFoundError', async () => {
    const maxId = await prisma.post.findFirst({ select: { id: true }, orderBy: { id: 'desc' } });
    const nonExistentId = (maxId?.id ?? 0) + 1;
    const result = await injectedGetPostById(nonExistentId);

    expect(result._unsafeUnwrapErr().constructor.name).toBe('NotFoundError');
  });
});
