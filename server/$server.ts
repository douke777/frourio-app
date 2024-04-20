import type { FastifyMultipartAttachFieldsToBodyOptions, MultipartFile } from '@fastify/multipart';
import type { ReadStream } from 'fs';
import type { HttpStatusOk, AspidaMethodParams } from 'aspida';
import type { Schema } from 'fast-json-stringify';
import type { z } from 'zod';
import hooksFn_1m6qgto from 'api/hooks';
import hooksFn_80ncp2 from 'api/auth/csrf/hooks';
import hooksFn_1yps78r from 'api/auth/login/hooks';
import hooksFn_17hl5xi from 'api/auth/logout/hooks';
import hooksFn_162n5ob from 'api/likes/hooks';
import hooksFn_17843s1 from 'api/profiles/hooks';
import validatorsFn_1ln2ulj from 'api/categories/_categoryId/validators';
import validatorsFn_15if2po from 'api/posts/_postId/validators';
import validatorsFn_1p3f06i from 'api/users/_userId/validators';
import controllerFn_1qxyj9s from 'api/controller';
import controllerFn_8myref from 'api/auth/controller';
import controllerFn_1n5xz46 from 'api/auth/csrf/controller';
import controllerFn_q9g69d from 'api/auth/login/controller';
import controllerFn_18yti from 'api/auth/logout/controller';
import controllerFn_wrryh8 from 'api/auth/signup/controller';
import controllerFn_1qdo4lx from 'api/categories/controller';
import controllerFn_1chl5mw from 'api/categories/_categoryId/controller';
import controllerFn_1c8eilo from 'api/hi/controller';
import controllerFn_pcjixt from 'api/likes/controller';
import controllerFn_1fkamk4 from 'api/posts/controller';
import controllerFn_3izadp from 'api/posts/category/controller';
import controllerFn_32koxk from 'api/posts/latest/controller';
import controllerFn_57a8rs from 'api/posts/related/controller';
import controllerFn_badbgf from 'api/posts/_postId/controller';
import controllerFn_xfo7hf from 'api/profiles/controller';
import controllerFn_1xegfg1 from 'api/users/controller';
import controllerFn_15x3ppx from 'api/users/_userId/controller';
import type { FastifyInstance, RouteHandlerMethod, preValidationHookHandler, FastifySchema, FastifySchemaCompiler, RouteShorthandOptions, onRequestHookHandler, preParsingHookHandler, preHandlerHookHandler } from 'fastify';

export type FrourioOptions = {
  basePath?: string;
  multipart?: FastifyMultipartAttachFieldsToBodyOptions;
};

type HttpStatusNoOk = 301 | 302 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 409 | 500 | 501 | 502 | 503 | 504 | 505;

type PartiallyPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type BaseResponse<T, U, V> = {
  status: V extends number ? V : HttpStatusOk;
  body: T;
  headers: U;
};

type ServerResponse<K extends AspidaMethodParams> =
  | (K extends { resBody: K['resBody']; resHeaders: K['resHeaders'] }
  ? BaseResponse<K['resBody'], K['resHeaders'], K['status']>
  : K extends { resBody: K['resBody'] }
  ? PartiallyPartial<BaseResponse<K['resBody'], K['resHeaders'], K['status']>, 'headers'>
  : K extends { resHeaders: K['resHeaders'] }
  ? PartiallyPartial<BaseResponse<K['resBody'], K['resHeaders'], K['status']>, 'body'>
  : PartiallyPartial<
      BaseResponse<K['resBody'], K['resHeaders'], K['status']>,
      'body' | 'headers'
    >)
  | PartiallyPartial<BaseResponse<any, any, HttpStatusNoOk>, 'body' | 'headers'>;

export type MultipartFileToBlob<T extends Record<string, unknown>> = {
  [P in keyof T]: Required<T>[P] extends MultipartFile
    ? Blob | ReadStream
    : Required<T>[P] extends MultipartFile[]
    ? (Blob | ReadStream)[]
    : T[P];
};

type BlobToFile<T extends AspidaMethodParams> = T['reqFormat'] extends FormData
  ? {
      [P in keyof T['reqBody']]: Required<T['reqBody']>[P] extends Blob | ReadStream
        ? MultipartFile
        : Required<T['reqBody']>[P] extends (Blob | ReadStream)[]
        ? MultipartFile[]
        : T['reqBody'][P];
    }
  : T['reqBody'];

type RequestParams<T extends AspidaMethodParams> = Pick<{
  query: T['query'];
  body: BlobToFile<T>;
  headers: T['reqHeaders'];
}, {
  query: Required<T>['query'] extends {} | null ? 'query' : never;
  body: Required<T>['reqBody'] extends {} | null ? 'body' : never;
  headers: Required<T>['reqHeaders'] extends {} | null ? 'headers' : never;
}['query' | 'body' | 'headers']>;

type ServerHandler<T extends AspidaMethodParams, U extends Record<string, unknown> = {}> = (
  req: RequestParams<T> & U,
) => ServerResponse<T>;

type ServerHandlerPromise<T extends AspidaMethodParams, U extends Record<string, unknown> = {}> = (
  req: RequestParams<T> & U,
) => Promise<ServerResponse<T>>;

type AddedHandler<T, R extends Record<string, unknown>> = T extends (req: infer U, ...args: infer V) => infer W ? (req: U & Partial<R>, ...args: V) => W : never;

export type ServerHooks<R extends Record<string, unknown> = {}> = {
  onRequest?: AddedHandler<onRequestHookHandler, R> | AddedHandler<onRequestHookHandler, R>[];
  preParsing?: AddedHandler<preParsingHookHandler, R> | AddedHandler<preParsingHookHandler, R>[];
  preValidation?: AddedHandler<preValidationHookHandler, R> | AddedHandler<preValidationHookHandler, R>[];
  preHandler?: AddedHandler<preHandlerHookHandler, R> | AddedHandler<preHandlerHookHandler, R>[];
};

export type ServerMethodHandler<T extends AspidaMethodParams,  U extends Record<string, unknown> = {}> = ServerHandler<T, U> | ServerHandlerPromise<T, U> | {
  validators?: { [Key in keyof RequestParams<T>]?: z.ZodType<RequestParams<T>[Key]>};
  schemas?: { response?: { [V in HttpStatusOk]?: Schema }};
  hooks?: ServerHooks<U>;
  handler: ServerHandler<T, U> | ServerHandlerPromise<T, U>;
};

const parseNumberTypeQueryParams = (numberTypeParams: [string, boolean, boolean][]): preValidationHookHandler => (req, reply, done) => {
  const query: any = req.query;

  for (const [key, isOptional, isArray] of numberTypeParams) {
    const param = isArray ? (query[`${key}[]`] ?? query[key]) : query[key];

    if (isArray) {
      if (!isOptional && param === undefined) {
        query[key] = [];
      } else if (!isOptional || param !== undefined) {
        const vals = (Array.isArray(param) ? param : [param]).map(Number);

        if (vals.some(isNaN)) {
          reply.code(400).send();
          return;
        }

        query[key] = vals as any;
      }

      delete query[`${key}[]`];
    } else if (!isOptional || param !== undefined) {
      const val = Number(param);

      if (isNaN(val)) {
        reply.code(400).send();
        return;
      }

      query[key] = val as any;
    }
  }

  done();
};

const validatorCompiler: FastifySchemaCompiler<FastifySchema> = ({ schema }) => (data: unknown) => {
  const result = (schema as z.ZodType<unknown>).safeParse(data);
  return result.success ? { value: result.data } : { error: result.error };
};

const methodToHandler = (
  methodCallback: ServerHandler<any, any>,
): RouteHandlerMethod => (req, reply) => {
  const data = methodCallback(req as any) as any;

  if (data.headers !== undefined) reply.headers(data.headers);

  reply.code(data.status).send(data.body);
};

const asyncMethodToHandler = (
  methodCallback: ServerHandlerPromise<any, any>,
): RouteHandlerMethod => async (req, reply) => {
  const data = await methodCallback(req as any) as any;

  if (data.headers !== undefined) reply.headers(data.headers);

  reply.code(data.status).send(data.body);
};

export default (fastify: FastifyInstance, options: FrourioOptions = {}) => {
  const basePath = options.basePath ?? '';
  const hooks_1m6qgto = hooksFn_1m6qgto(fastify);
  const hooks_80ncp2 = hooksFn_80ncp2(fastify);
  const hooks_1yps78r = hooksFn_1yps78r(fastify);
  const hooks_17hl5xi = hooksFn_17hl5xi(fastify);
  const hooks_162n5ob = hooksFn_162n5ob(fastify);
  const hooks_17843s1 = hooksFn_17843s1(fastify);
  const validators_1ln2ulj = validatorsFn_1ln2ulj(fastify);
  const validators_15if2po = validatorsFn_15if2po(fastify);
  const validators_1p3f06i = validatorsFn_1p3f06i(fastify);
  const controller_1qxyj9s = controllerFn_1qxyj9s(fastify);
  const controller_8myref = controllerFn_8myref(fastify);
  const controller_1n5xz46 = controllerFn_1n5xz46(fastify);
  const controller_q9g69d = controllerFn_q9g69d(fastify);
  const controller_18yti = controllerFn_18yti(fastify);
  const controller_wrryh8 = controllerFn_wrryh8(fastify);
  const controller_1qdo4lx = controllerFn_1qdo4lx(fastify);
  const controller_1chl5mw = controllerFn_1chl5mw(fastify);
  const controller_1c8eilo = controllerFn_1c8eilo(fastify);
  const controller_pcjixt = controllerFn_pcjixt(fastify);
  const controller_1fkamk4 = controllerFn_1fkamk4(fastify);
  const controller_3izadp = controllerFn_3izadp(fastify);
  const controller_32koxk = controllerFn_32koxk(fastify);
  const controller_57a8rs = controllerFn_57a8rs(fastify);
  const controller_badbgf = controllerFn_badbgf(fastify);
  const controller_xfo7hf = controllerFn_xfo7hf(fastify);
  const controller_1xegfg1 = controllerFn_1xegfg1(fastify);
  const controller_15x3ppx = controllerFn_15x3ppx(fastify);

  fastify.get(
    basePath || '/',
    {
      preParsing: hooks_1m6qgto.preParsing,
    },
    methodToHandler(controller_1qxyj9s.get),
  );

  fastify.get(
    `${basePath}/auth`,
    {
      preParsing: hooks_1m6qgto.preParsing,
    },
    methodToHandler(controller_8myref.get),
  );

  fastify.get(
    `${basePath}/auth/csrf`,
    {
      preParsing: hooks_1m6qgto.preParsing,
      preHandler: hooks_80ncp2.preHandler,
    } as RouteShorthandOptions,
    methodToHandler(controller_1n5xz46.get),
  );

  fastify.post(
    `${basePath}/auth/login`,
    {
      preParsing: hooks_1m6qgto.preParsing,
      preHandler: hooks_1yps78r.preHandler,
    } as RouteShorthandOptions,
    methodToHandler(controller_q9g69d.post),
  );

  fastify.post(
    `${basePath}/auth/logout`,
    {
      preParsing: hooks_1m6qgto.preParsing,
      preHandler: hooks_17hl5xi.preHandler,
    },
    methodToHandler(controller_18yti.post),
  );

  fastify.post(
    `${basePath}/auth/signup`,
    {
      preParsing: hooks_1m6qgto.preParsing,
    },
    asyncMethodToHandler(controller_wrryh8.post),
  );

  fastify.get(
    `${basePath}/categories`,
    {
      preParsing: hooks_1m6qgto.preParsing,
    },
    asyncMethodToHandler(controller_1qdo4lx.get),
  );

  fastify.get(
    `${basePath}/categories/:categoryId`,
    {
      schema: {
        params: validators_1ln2ulj.params,
      },
      validatorCompiler,
      preParsing: hooks_1m6qgto.preParsing,
    },
    asyncMethodToHandler(controller_1chl5mw.get),
  );

  fastify.get(
    `${basePath}/hi`,
    {
      preParsing: hooks_1m6qgto.preParsing,
    },
    methodToHandler(controller_1c8eilo.get),
  );

  fastify.get(
    `${basePath}/likes`,
    {
      onRequest: hooks_162n5ob.onRequest,
      preParsing: hooks_1m6qgto.preParsing,
      preValidation: parseNumberTypeQueryParams([['userId', false, false], ['postId', false, false]]),
    } as RouteShorthandOptions,
    asyncMethodToHandler(controller_pcjixt.get),
  );

  fastify.post(
    `${basePath}/likes`,
    {
      onRequest: hooks_162n5ob.onRequest,
      preParsing: hooks_1m6qgto.preParsing,
    } as RouteShorthandOptions,
    asyncMethodToHandler(controller_pcjixt.post),
  );

  fastify.get(
    `${basePath}/posts`,
    {
      preParsing: hooks_1m6qgto.preParsing,
    } as RouteShorthandOptions,
    asyncMethodToHandler(controller_1fkamk4.get),
  );

  fastify.post(
    `${basePath}/posts`,
    {
      onRequest: controller_1fkamk4.post.hooks.onRequest,
      preParsing: hooks_1m6qgto.preParsing,
    } as RouteShorthandOptions,
    asyncMethodToHandler(controller_1fkamk4.post.handler),
  );

  fastify.get(
    `${basePath}/posts/category`,
    {
      preParsing: hooks_1m6qgto.preParsing,
    },
    asyncMethodToHandler(controller_3izadp.get),
  );

  fastify.get(
    `${basePath}/posts/latest`,
    {
      preParsing: hooks_1m6qgto.preParsing,
    },
    asyncMethodToHandler(controller_32koxk.get),
  );

  fastify.get(
    `${basePath}/posts/related`,
    {
      preParsing: hooks_1m6qgto.preParsing,
      preValidation: parseNumberTypeQueryParams([['postId', false, false]]),
    },
    asyncMethodToHandler(controller_57a8rs.get),
  );

  fastify.get(
    `${basePath}/posts/:postId`,
    {
      schema: {
        params: validators_15if2po.params,
      },
      validatorCompiler,
      preParsing: hooks_1m6qgto.preParsing,
    } as RouteShorthandOptions,
    asyncMethodToHandler(controller_badbgf.get),
  );

  fastify.patch(
    `${basePath}/posts/:postId`,
    {
      schema: {
        params: validators_15if2po.params,
      },
      validatorCompiler,
      preParsing: hooks_1m6qgto.preParsing,
      preHandler: controller_badbgf.patch.hooks.preHandler,
    } as RouteShorthandOptions,
    asyncMethodToHandler(controller_badbgf.patch.handler),
  );

  fastify.delete(
    `${basePath}/posts/:postId`,
    {
      schema: {
        params: validators_15if2po.params,
      },
      validatorCompiler,
      preParsing: hooks_1m6qgto.preParsing,
      preHandler: controller_badbgf.delete.hooks.preHandler,
    } as RouteShorthandOptions,
    asyncMethodToHandler(controller_badbgf.delete.handler),
  );

  fastify.get(
    `${basePath}/profiles`,
    {
      onRequest: hooks_17843s1.onRequest,
      preParsing: hooks_1m6qgto.preParsing,
    } as RouteShorthandOptions,
    asyncMethodToHandler(controller_xfo7hf.get),
  );

  fastify.post(
    `${basePath}/profiles`,
    {
      onRequest: hooks_17843s1.onRequest,
      preParsing: hooks_1m6qgto.preParsing,
    } as RouteShorthandOptions,
    asyncMethodToHandler(controller_xfo7hf.post),
  );

  fastify.get(
    `${basePath}/users`,
    {
      preParsing: hooks_1m6qgto.preParsing,
    },
    methodToHandler(controller_1xegfg1.get),
  );

  fastify.get(
    `${basePath}/users/:userId`,
    {
      schema: {
        params: validators_1p3f06i.params,
      },
      validatorCompiler,
      preParsing: hooks_1m6qgto.preParsing,
    },
    asyncMethodToHandler(controller_15x3ppx.get),
  );

  fastify.patch(
    `${basePath}/users/:userId`,
    {
      schema: {
        params: validators_1p3f06i.params,
      },
      validatorCompiler,
      preParsing: hooks_1m6qgto.preParsing,
    },
    asyncMethodToHandler(controller_15x3ppx.patch),
  );

  return fastify;
};
