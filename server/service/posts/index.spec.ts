import { faker } from '@faker-js/faker';
import { Post, User } from '@prisma/client';

import { postFactory, userFactory } from '$/__test__/factories';
import { PostWithDetails } from '$/types';

import { createPost, deletePost, getPostById } from '.';

const prisma = jestPrisma.client;

describe('getPostById', () => {
  const injectedGetPostById = getPostById.inject({ prisma });

  let post: PostWithDetails;

  beforeEach(async () => {
    post = await postFactory(prisma);
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

describe('createPost', () => {
  const injectedCreatePost = createPost.inject({ prisma });

  let user: User;

  beforeEach(async () => {
    user = await userFactory(prisma);
  });

  it('Success', async () => {
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

  let post: Post;

  beforeEach(async () => {
    post = await postFactory(prisma);
  });

  it('Success', async () => {
    const result = await injectedDeletePost(post.authorId, post.id);

    expect(result._unsafeUnwrap().title).toEqual(post.title);
  });

  describe('authorId is incorrect', () => {
    it('BadRequestError', async () => {
      const result = await injectedDeletePost(post.authorId + 1, post.id);

      expect(result._unsafeUnwrapErr().constructor.name).toBe('BadRequestError');
    });
  });
});
