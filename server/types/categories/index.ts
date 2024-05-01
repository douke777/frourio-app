import { Prisma } from '@prisma/client';

export type CategoryWithDetails = Prisma.CategoryGetPayload<{
  include: {
    posts: {
      include: {
        author: {
          select: {
            id: true;
            name: true;
            image: true;
          };
        };
      };
    };
  };
}>;
