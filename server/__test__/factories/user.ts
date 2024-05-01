import { faker } from '@faker-js/faker';

import { SafeUser, UserWithProfile } from '$/types';

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
  return await prisma.user.create({
    data: { ...userData },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });
};

export const userWithProfileFactory = async (prisma: JestPrisma): Promise<UserWithProfile> => {
  return await prisma.user.create({
    data: { ...userData },
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
