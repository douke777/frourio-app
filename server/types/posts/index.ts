import { Prisma } from '@prisma/client';

export type CreatingPost = {
  title: string;
  content: string;
  published: boolean;
  categorySlug: string;
};

export type EditingPost = CreatingPost & {
  id: number;
};

export type PostWithDetails = Prisma.PostGetPayload<{
  include: {
    category: {
      select: {
        id: true;
        slug: true;
      };
    };
    author: {
      select: {
        id: true;
        name: true;
        image: true;
      };
    };
  };
}>;
