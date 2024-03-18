import { User as PrismaUser } from '@prisma/client';

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
