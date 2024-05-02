import { faker } from '@faker-js/faker';

import { postFactory, userWithProfileFactory } from '$/__test__/factories';

import { createPost, deletePost, getPostById } from '.';

const prisma = jestPrisma.client;

describe('getPostById', () => {
  const injectedGetPostById = getPostById.inject({ prisma });

  it('returns the correct post when given a valid id', async () => {
    const post = await postFactory(prisma);
    const result = await injectedGetPostById(post.id);

    expect(result._unsafeUnwrap()).toEqual(post);
  });

  it('throws NotFoundError when given a non-existent id', async () => {
    const maxId = await prisma.post.findFirst({ select: { id: true }, orderBy: { id: 'desc' } });
    const nonExistentId = (maxId?.id ?? 0) + 1;
    const result = await injectedGetPostById(nonExistentId);

    expect(result._unsafeUnwrapErr().constructor.name).toBe('NotFoundError');
  });
});

describe('createPost', () => {
  const injectedCreatePost = createPost.inject({ prisma });

  it('creates a post with the given data', async () => {
    const user = await userWithProfileFactory(prisma);
    const authorId = user.id;
    const data = {
      title: faker.lorem.word(),
      content: faker.lorem.sentence(),
      published: true,
      categorySlug: 'programming',
    };

    const result = await injectedCreatePost(authorId, data);

    expect(result._unsafeUnwrap().title).toEqual(data.title);
  });
});

describe('deletePost', () => {
  const injectedDeletePost = deletePost.inject({ prisma });

  it('deletes the post with the given id', async () => {
    const post = await postFactory(prisma);
    const result = await injectedDeletePost(post.authorId, post.id);

    expect(result._unsafeUnwrap().title).toEqual(post.title);
  });

  it('throws BadRequestError when given an incorrect authorId', async () => {
    const post = await postFactory(prisma);
    const result = await injectedDeletePost(post.authorId + 1, post.id);

    expect(result._unsafeUnwrapErr().constructor.name).toBe('BadRequestError');
  });
});
