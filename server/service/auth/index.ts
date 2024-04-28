import { User } from '@prisma/client';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ResultAsync, okAsync, errAsync } from 'neverthrow';
import { depend } from 'velona';

import { BadRequestError, Err } from '$/lib/error';
import { Jwt, SignUpDto, LoginDto } from '$/types/auth';
import { hashPassword, verifyPassword } from '$/utils/auth';

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
  ({ prisma }, app: FastifyInstance, dto: LoginDto): ResultAsync<Jwt, Err> => {
    return ResultAsync.fromPromise(
      prisma.user.findUniqueOrThrow({
        where: {
          email: dto.email,
        },
      }),
      (e) => handlePrismaError(e),
    )
      .andThen((user) =>
        ResultAsync.fromPromise(
          verifyPassword(dto.password, user.password).then((isValid) => (isValid ? user : null)),
          (e) => handlePrismaError(e),
        ),
      )
      .andThen((user) =>
        user ? okAsync(generateJwt(app, user.id, user.email)) : errAsync(new BadRequestError()),
      );
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
