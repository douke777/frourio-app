export type SignUpDto = {
  name: string;
  email: string;
  password: string;
  image?: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type Msg = {
  message: string;
};

export type Csrf = {
  csrfToken: string;
};

export type Jwt = {
  accessToken: string;
};

export type JwtPayload = {
  sub: number;
  email: string;
  iat: number;
};
