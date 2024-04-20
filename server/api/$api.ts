import type { AspidaClient } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_by08hd } from '.';
import type { Methods as Methods_163xhtc } from './auth';
import type { Methods as Methods_1kxgz87 } from './auth/csrf';
import type { Methods as Methods_19l45fu } from './auth/login';
import type { Methods as Methods_85qyf7 } from './auth/logout';
import type { Methods as Methods_1yes9ht } from './auth/signup';
import type { Methods as Methods_ldtlk2 } from './categories';
import type { Methods as Methods_19d48bx } from './categories/_categoryId';
import type { Methods as Methods_1yrd359 } from './hi';
import type { Methods as Methods_1ft3bmu } from './likes';
import type { Methods as Methods_1kz9onh } from './posts';
import type { Methods as Methods_1bww5mg } from './posts/_postId';
import type { Methods as Methods_svgbni } from './posts/category';
import type { Methods as Methods_1xvwu3x } from './posts/latest';
import type { Methods as Methods_jtt32x } from './posts/related';
import type { Methods as Methods_1qj5k18 } from './profiles';
import type { Methods as Methods_1xhiioa } from './users';
import type { Methods as Methods_kyp39q } from './users/_userId';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:8888' : baseURL).replace(/\/$/, '');
  const PATH0 = '/auth';
  const PATH1 = '/auth/csrf';
  const PATH2 = '/auth/login';
  const PATH3 = '/auth/logout';
  const PATH4 = '/auth/signup';
  const PATH5 = '/categories';
  const PATH6 = '/hi';
  const PATH7 = '/likes';
  const PATH8 = '/posts';
  const PATH9 = '/posts/category';
  const PATH10 = '/posts/latest';
  const PATH11 = '/posts/related';
  const PATH12 = '/profiles';
  const PATH13 = '/users';
  const GET = 'GET';
  const POST = 'POST';
  const DELETE = 'DELETE';
  const PATCH = 'PATCH';

  return {
    auth: {
      csrf: {
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1kxgz87['get']['resBody']>(prefix, PATH1, GET, option).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1kxgz87['get']['resBody']>(prefix, PATH1, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`,
      },
      login: {
        post: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_19l45fu['post']['resBody']>(prefix, PATH2, POST, option).json(),
        $post: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_19l45fu['post']['resBody']>(prefix, PATH2, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH2}`,
      },
      logout: {
        post: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_85qyf7['post']['resBody']>(prefix, PATH3, POST, option).json(),
        $post: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_85qyf7['post']['resBody']>(prefix, PATH3, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH3}`,
      },
      signup: {
        post: (option: { body: Methods_1yes9ht['post']['reqBody'], config?: T | undefined }) =>
          fetch(prefix, PATH4, POST, option).send(),
        $post: (option: { body: Methods_1yes9ht['post']['reqBody'], config?: T | undefined }) =>
          fetch(prefix, PATH4, POST, option).send().then(r => r.body),
        $path: () => `${prefix}${PATH4}`,
      },
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_163xhtc['get']['resBody']>(prefix, PATH0, GET, option).text(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_163xhtc['get']['resBody']>(prefix, PATH0, GET, option).text().then(r => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
    categories: {
      _categoryId: (val1: number | string) => {
        const prefix1 = `${PATH5}/${val1}`;

        return {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_19d48bx['get']['resBody']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_19d48bx['get']['resBody']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_ldtlk2['get']['resBody']>(prefix, PATH5, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_ldtlk2['get']['resBody']>(prefix, PATH5, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH5}`,
    },
    hi: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1yrd359['get']['resBody']>(prefix, PATH6, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1yrd359['get']['resBody']>(prefix, PATH6, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH6}`,
    },
    likes: {
      get: (option: { query: Methods_1ft3bmu['get']['query'], config?: T | undefined }) =>
        fetch(prefix, PATH7, GET, option).send(),
      $get: (option: { query: Methods_1ft3bmu['get']['query'], config?: T | undefined }) =>
        fetch(prefix, PATH7, GET, option).send().then(r => r.body),
      post: (option: { body: Methods_1ft3bmu['post']['reqBody'], config?: T | undefined }) =>
        fetch(prefix, PATH7, POST, option).send(),
      $post: (option: { body: Methods_1ft3bmu['post']['reqBody'], config?: T | undefined }) =>
        fetch(prefix, PATH7, POST, option).send().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_1ft3bmu['get']['query'] } | undefined) =>
        `${prefix}${PATH7}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    posts: {
      _postId: (val1: number | string) => {
        const prefix1 = `${PATH8}/${val1}`;

        return {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1bww5mg['get']['resBody']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1bww5mg['get']['resBody']>(prefix, prefix1, GET, option).json().then(r => r.body),
          patch: (option: { body: Methods_1bww5mg['patch']['reqBody'], config?: T | undefined }) =>
            fetch(prefix, prefix1, PATCH, option).send(),
          $patch: (option: { body: Methods_1bww5mg['patch']['reqBody'], config?: T | undefined }) =>
            fetch(prefix, prefix1, PATCH, option).send().then(r => r.body),
          delete: (option?: { config?: T | undefined } | undefined) =>
            fetch(prefix, prefix1, DELETE, option).send(),
          $delete: (option?: { config?: T | undefined } | undefined) =>
            fetch(prefix, prefix1, DELETE, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      category: {
        get: (option: { query: Methods_svgbni['get']['query'], config?: T | undefined }) =>
          fetch<Methods_svgbni['get']['resBody']>(prefix, PATH9, GET, option).json(),
        $get: (option: { query: Methods_svgbni['get']['query'], config?: T | undefined }) =>
          fetch<Methods_svgbni['get']['resBody']>(prefix, PATH9, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_svgbni['get']['query'] } | undefined) =>
          `${prefix}${PATH9}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
      latest: {
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1xvwu3x['get']['resBody']>(prefix, PATH10, GET, option).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1xvwu3x['get']['resBody']>(prefix, PATH10, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH10}`,
      },
      related: {
        get: (option: { query: Methods_jtt32x['get']['query'], config?: T | undefined }) =>
          fetch<Methods_jtt32x['get']['resBody']>(prefix, PATH11, GET, option).json(),
        $get: (option: { query: Methods_jtt32x['get']['query'], config?: T | undefined }) =>
          fetch<Methods_jtt32x['get']['resBody']>(prefix, PATH11, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_jtt32x['get']['query'] } | undefined) =>
          `${prefix}${PATH11}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1kz9onh['get']['resBody']>(prefix, PATH8, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1kz9onh['get']['resBody']>(prefix, PATH8, GET, option).json().then(r => r.body),
      post: (option: { body: Methods_1kz9onh['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1kz9onh['post']['resBody']>(prefix, PATH8, POST, option).json(),
      $post: (option: { body: Methods_1kz9onh['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1kz9onh['post']['resBody']>(prefix, PATH8, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH8}`,
    },
    profiles: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1qj5k18['get']['resBody']>(prefix, PATH12, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1qj5k18['get']['resBody']>(prefix, PATH12, GET, option).json().then(r => r.body),
      post: (option: { body: Methods_1qj5k18['post']['reqBody'], config?: T | undefined }) =>
        fetch(prefix, PATH12, POST, option).send(),
      $post: (option: { body: Methods_1qj5k18['post']['reqBody'], config?: T | undefined }) =>
        fetch(prefix, PATH12, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH12}`,
    },
    users: {
      _userId: (val1: number | string) => {
        const prefix1 = `${PATH13}/${val1}`;

        return {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_kyp39q['get']['resBody']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_kyp39q['get']['resBody']>(prefix, prefix1, GET, option).json().then(r => r.body),
          patch: (option: { body: Methods_kyp39q['patch']['reqBody'], config?: T | undefined }) =>
            fetch(prefix, prefix1, PATCH, option).send(),
          $patch: (option: { body: Methods_kyp39q['patch']['reqBody'], config?: T | undefined }) =>
            fetch(prefix, prefix1, PATCH, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1xhiioa['get']['resBody']>(prefix, PATH13, GET, option).text(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1xhiioa['get']['resBody']>(prefix, PATH13, GET, option).text().then(r => r.body),
      $path: () => `${prefix}${PATH13}`,
    },
    get: (option?: { config?: T | undefined } | undefined) =>
      fetch<Methods_by08hd['get']['resBody']>(prefix, '', GET, option).json(),
    $get: (option?: { config?: T | undefined } | undefined) =>
      fetch<Methods_by08hd['get']['resBody']>(prefix, '', GET, option).json().then(r => r.body),
    $path: () => `${prefix}`,
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
