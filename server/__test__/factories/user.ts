import { faker } from '@faker-js/faker';

import { SafeUser, UserWithProfile } from '$/types';
import { hashPassword } from '$/utils/auth';

import { JestPrisma } from '../types/prisma';

export const userData = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  profile: {
    create: {
      bio: faker.lorem.sentence(),
    },
  },
};

export const userFactory = async (prisma: JestPrisma): Promise<SafeUser> => {
  const hashedPassword = await hashPassword(userData.password);

  return await prisma.user.create({
    data: { ...userData, password: hashedPassword },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });
};

export const userWithProfileFactory = async (prisma: JestPrisma): Promise<UserWithProfile> => {
  const hashedPassword = await hashPassword(userData.password);

  return await prisma.user.create({
    data: { ...userData, password: hashedPassword },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      profile: {
        select: {
          bio: true,
        },
      },
    },
  });
};

export const upsertProfileDto = { name: faker.person.fullName(), bio: faker.lorem.sentence() };
