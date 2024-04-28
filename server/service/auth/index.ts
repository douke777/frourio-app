import { User } from '@prisma/client';
import { compare } from 'bcryptjs';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ResultAsync } from 'neverthrow';
import { depend } from 'velona';

import { Err } from '$/lib/error';
import { Jwt, SignUpDto, LoginDto } from '$/types/auth';
import { hashPassword } from '$/utils/auth';

import { handlePrismaError, prisma } from '..';

export const signUp = depend({ prisma }, ({ prisma }, dto: SignUpDto): ResultAsync<User, Err> => {
  return ResultAsync.fromPromise(hashPassword(dto.password), (e) => handlePrismaError(e)).andThen(
    (hashedPassword) =>
      ResultAsync.fromPromise(
        prisma.user.create({
          data: {
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
            profile: {
              create: {
                bio: '',
              },
            },
          },
        }),
        (e) => handlePrismaError(e),
      ),
  );
});

export const login = depend(
  { prisma },
  async ({ prisma }, app: FastifyInstance, dto: LoginDto): Promise<Jwt> => {
    const user = await prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // TODO: throw new error。 Email or password incorrect
    if (!user) throw new Error('Email or password incorrect');
    const isValid = await compare(dto.password, user.password);
    if (!isValid) throw new Error('Email or password incorrect');

    return generateJwt(app, user.id, user.email);
  },
);

export function generateJwt(app: FastifyInstance, userId: User['id'], email: User['email']) {
  const payload = {
    sub: userId,
    email,
  };

  return { accessToken: app.jwt.sign(payload) };
}

export async function verifyJwtToken(req: FastifyRequest, reply: FastifyReply) {
  req.jwtVerify().catch((err) => reply.send(err));
}
