import { postFactory, likeFactory } from '$/__test__/factories';

import { getLike, toggleLike } from '.';

const prisma = jestPrisma.client;

describe('toggleLike', () => {
  const injectedGetLike = getLike.inject({ prisma });
  const injectedToggleLike = toggleLike.inject({ prisma });

  it('removes a like when a like already exists', async () => {
    const post = await postFactory(prisma);
    await likeFactory(prisma, post.authorId, post.id);

    await injectedToggleLike(post.authorId, post.id);
    const result = await injectedGetLike(post.authorId, post.id);
    expect(result._unsafeUnwrap()).toBeNull();
  });

  it('creates a like when no like exists', async () => {
    const post = await postFactory(prisma);

    await injectedToggleLike(post.authorId, post.id);
    const result = await injectedGetLike(post.authorId, post.id);
    expect(result._unsafeUnwrap()).not.toBeNull();
  });
});
