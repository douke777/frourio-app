import { Prisma, User as PrismaUser } from '@prisma/client';

export type CreatingUser = {
  name: string;
  email: string;
  password: string;
  image?: string;
};

export type EditingUser = CreatingUser & {
  active: boolean;
};

type OmittedProps = 'password' | 'role' | 'active';
export type User = Omit<PrismaUser, OmittedProps>;

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
