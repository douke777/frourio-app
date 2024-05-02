import { categoryData } from '$/prisma/seed';

import { getCategories, getCategoryById } from '.';

const prisma = jestPrisma.client;

describe('getCategories', () => {
  const injectedGetCategories = getCategories.inject({ prisma });

  it('returns all categories', async () => {
    const result = await injectedGetCategories();

    expect(result._unsafeUnwrap().length).toEqual(categoryData.length);
  });
});

describe('getCategoryById', () => {
  const injectedGetCategoryById = getCategoryById.inject({ prisma });

  it('returns a category with posts and their authors', async () => {
    const result = await injectedGetCategoryById(1);
    const category = result._unsafeUnwrap();

    expect(category).toHaveProperty('posts');
    category.posts.forEach((post) => {
      expect(post).toHaveProperty('author');
    });
  });
});
