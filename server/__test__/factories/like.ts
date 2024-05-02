import { Post, User } from '@prisma/client';

import { JestPrisma } from '../types/prisma';

export const likeFactory = async (prisma: JestPrisma, userId: User['id'], postId: Post['id']) => {
  return await prisma.like.create({
    data: { userId, postId },
  });
};
