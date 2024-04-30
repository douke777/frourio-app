import { Prisma } from '@prisma/client';

export type CreatingUser = {
  name: string;
  email: string;
  password: string;
  image?: string;
};

export type EditingUser = CreatingUser & {
  active: boolean;
};

export type SafeUser = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    email: true;
    image: true;
  };
}>;

export type UserWithDetails = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    email: true;
    image: true;
    profile: {
      select: {
        bio: true;
      };
    };
    posts: true;
  };
}>;
