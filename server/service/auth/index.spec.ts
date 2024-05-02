import { faker } from '@faker-js/faker';
import { FastifyInstance } from 'fastify';

import { userFactory } from '$/__test__/factories';
import { SignUpDto, LoginDto } from '$/types/auth';

import { userData } from '../../__test__/factories/user';

import { signUp, login } from '.';

const prisma = jestPrisma.client;

describe('signUp', () => {
  const injectedSignUp = signUp.inject({ prisma });

  it('creates a new user with hashed password and empty profile', async () => {
    const dto: SignUpDto = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const result = await injectedSignUp(dto);
    const user = result._unsafeUnwrap();

    expect(user.name).toEqual(dto.name);
    expect(user.email).toEqual(dto.email);
  });
});

const app = {} as FastifyInstance;
app.jwt = {
  sign: jest.fn().mockReturnValue('access_token'),
  options: {
    decode: {},
    sign: {},
    verify: {},
  },
  verify: jest.fn(),
  decode: jest.fn(),
  lookupToken: jest.fn(),
};
describe('login', () => {
  const injectedLogin = login.inject({ prisma });

  it('logs in a user and returns a JWT', async () => {
    const user = await userFactory(prisma);

    const dto: LoginDto = {
      email: userData.email,
      password: userData.password,
    };
    const result = await injectedLogin(app, dto);

    expect(result._unsafeUnwrap()).toEqual({ accessToken: expect.any(String) });
    expect(app.jwt.sign).toHaveBeenCalledWith({ sub: user.id, email: user.email });
  });
});
