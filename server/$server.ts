import type { FastifyMultipartAttachFieldsToBodyOptions, MultipartFile } from '@fastify/multipart';
import type { ReadStream } from 'fs';
import type { HttpStatusOk, AspidaMethodParams } from 'aspida';
import type { Schema } from 'fast-json-stringify';
import type { z } from 'zod';
import validatorsFn_15if2po from 'api/posts/_postId/validators';
import controllerFn_1qxyj9s from 'api/controller';
import controllerFn_1c8eilo from 'api/hi/controller';
import controllerFn_pcjixt from 'api/likes/controller';
import controllerFn_1fkamk4 from 'api/posts/controller';
import controllerFn_badbgf from 'api/posts/_postId/controller';
import controllerFn_1xegfg1 from 'api/users/controller';
import controllerFn_10b09sw from 'api/users/profiles/controller';
import type { FastifyInstance, RouteHandlerMethod, preValidationHookHandler, FastifySchema, FastifySchemaCompiler, onRequestHookHandler, preParsingHookHandler, preHandlerHookHandler } from 'fastify';

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
  const validators_15if2po = validatorsFn_15if2po(fastify);
  const controller_1qxyj9s = controllerFn_1qxyj9s(fastify);
  const controller_1c8eilo = controllerFn_1c8eilo(fastify);
  const controller_pcjixt = controllerFn_pcjixt(fastify);
  const controller_1fkamk4 = controllerFn_1fkamk4(fastify);
  const controller_badbgf = controllerFn_badbgf(fastify);
  const controller_1xegfg1 = controllerFn_1xegfg1(fastify);
  const controller_10b09sw = controllerFn_10b09sw(fastify);

  fastify.get(basePath || '/', methodToHandler(controller_1qxyj9s.get));

  fastify.get(`${basePath}/hi`, methodToHandler(controller_1c8eilo.get));

  fastify.get(
    `${basePath}/likes`,
    {
      preValidation: parseNumberTypeQueryParams([['userId', false, false], ['postId', false, false]]),
    },
    asyncMethodToHandler(controller_pcjixt.get),
  );

  fastify.post(`${basePath}/likes`, asyncMethodToHandler(controller_pcjixt.post));

  fastify.get(`${basePath}/posts`, asyncMethodToHandler(controller_1fkamk4.get));

  fastify.post(`${basePath}/posts`, asyncMethodToHandler(controller_1fkamk4.post));

  fastify.get(`${basePath}/posts/:postId`,
    {
      schema: {
        params: validators_15if2po.params,
      },
      validatorCompiler,
    }, asyncMethodToHandler(controller_badbgf.get));

  fastify.patch(`${basePath}/posts/:postId`,
    {
      schema: {
        params: validators_15if2po.params,
      },
      validatorCompiler,
    }, asyncMethodToHandler(controller_badbgf.patch));

  fastify.delete(`${basePath}/posts/:postId`,
    {
      schema: {
        params: validators_15if2po.params,
      },
      validatorCompiler,
    }, asyncMethodToHandler(controller_badbgf.delete));

  fastify.get(`${basePath}/users`, methodToHandler(controller_1xegfg1.get));

  fastify.post(`${basePath}/users/profiles`, asyncMethodToHandler(controller_10b09sw.post));

  return fastify;
};
