import { Prisma } from '@prisma/client';

export type EditingUserWithProfile = {
  name: string;
  bio: string | null;
};

export type UserWithProfile = Prisma.UserGetPayload<{
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
  };
}>;
