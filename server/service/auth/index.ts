import { User } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { depend } from 'velona';

import { Jwt, Msg, SignUpDto, LoginDto } from '$/types/auth';

import { prisma } from '..';

export const signUp = depend({ prisma }, async ({ prisma }, dto: SignUpDto): Promise<Msg> => {
  const hashedPassword = await hash(dto.password, 12);
  await prisma.user.create({
    data: {
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    },
  });
  // TODO: error handling P2002 → すでにUserがあるとき。 This email is already taken

  // TODO: メッセージのreturnいる？
  return {
    message: 'ok',
  };
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
