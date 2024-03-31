import type { AspidaClient } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_by08hd } from '.';
import type { Methods as Methods_163xhtc } from './auth';
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
import type { Methods as Methods_jtt32x } from './posts/related';
import type { Methods as Methods_1qj5k18 } from './profiles';
import type { Methods as Methods_1xhiioa } from './users';
import type { Methods as Methods_kyp39q } from './users/_userId';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:8888' : baseURL).replace(/\/$/, '');
  const PATH0 = '/auth';
  const PATH1 = '/auth/login';
  const PATH2 = '/auth/logout';
  const PATH3 = '/auth/signup';
  const PATH4 = '/categories';
  const PATH5 = '/hi';
  const PATH6 = '/likes';
  const PATH7 = '/posts';
  const PATH8 = '/posts/category';
  const PATH9 = '/posts/related';
  const PATH10 = '/profiles';
  const PATH11 = '/users';
  const GET = 'GET';
  const POST = 'POST';
  const DELETE = 'DELETE';
  const PATCH = 'PATCH';

  return {
    auth: {
      login: {
        post: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_19l45fu['post']['resBody']>(prefix, PATH1, POST, option).json(),
        $post: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_19l45fu['post']['resBody']>(prefix, PATH1, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`,
      },
      logout: {
        post: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_85qyf7['post']['resBody']>(prefix, PATH2, POST, option).json(),
        $post: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_85qyf7['post']['resBody']>(prefix, PATH2, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH2}`,
      },
      signup: {
        post: (option: { body: Methods_1yes9ht['post']['reqBody'], config?: T | undefined }) =>
          fetch(prefix, PATH3, POST, option).send(),
        $post: (option: { body: Methods_1yes9ht['post']['reqBody'], config?: T | undefined }) =>
          fetch(prefix, PATH3, POST, option).send().then(r => r.body),
        $path: () => `${prefix}${PATH3}`,
      },
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_163xhtc['get']['resBody']>(prefix, PATH0, GET, option).text(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_163xhtc['get']['resBody']>(prefix, PATH0, GET, option).text().then(r => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
    categories: {
      _categoryId: (val1: number | string) => {
        const prefix1 = `${PATH4}/${val1}`;

        return {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_19d48bx['get']['resBody']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_19d48bx['get']['resBody']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_ldtlk2['get']['resBody']>(prefix, PATH4, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_ldtlk2['get']['resBody']>(prefix, PATH4, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH4}`,
    },
    hi: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1yrd359['get']['resBody']>(prefix, PATH5, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1yrd359['get']['resBody']>(prefix, PATH5, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH5}`,
    },
    likes: {
      get: (option: { query: Methods_1ft3bmu['get']['query'], config?: T | undefined }) =>
        fetch(prefix, PATH6, GET, option).send(),
      $get: (option: { query: Methods_1ft3bmu['get']['query'], config?: T | undefined }) =>
        fetch(prefix, PATH6, GET, option).send().then(r => r.body),
      post: (option: { body: Methods_1ft3bmu['post']['reqBody'], config?: T | undefined }) =>
        fetch(prefix, PATH6, POST, option).send(),
      $post: (option: { body: Methods_1ft3bmu['post']['reqBody'], config?: T | undefined }) =>
        fetch(prefix, PATH6, POST, option).send().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_1ft3bmu['get']['query'] } | undefined) =>
        `${prefix}${PATH6}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    posts: {
      _postId: (val1: number | string) => {
        const prefix1 = `${PATH7}/${val1}`;

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
        get: (option?: { query?: Methods_svgbni['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods_svgbni['get']['resBody']>(prefix, PATH8, GET, option).text(),
        $get: (option?: { query?: Methods_svgbni['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods_svgbni['get']['resBody']>(prefix, PATH8, GET, option).text().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_svgbni['get']['query'] } | undefined) =>
          `${prefix}${PATH8}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
      related: {
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_jtt32x['get']['resBody']>(prefix, PATH9, GET, option).text(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_jtt32x['get']['resBody']>(prefix, PATH9, GET, option).text().then(r => r.body),
        $path: () => `${prefix}${PATH9}`,
      },
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1kz9onh['get']['resBody']>(prefix, PATH7, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1kz9onh['get']['resBody']>(prefix, PATH7, GET, option).json().then(r => r.body),
      post: (option: { body: Methods_1kz9onh['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1kz9onh['post']['resBody']>(prefix, PATH7, POST, option).json(),
      $post: (option: { body: Methods_1kz9onh['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1kz9onh['post']['resBody']>(prefix, PATH7, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH7}`,
    },
    profiles: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1qj5k18['get']['resBody']>(prefix, PATH10, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1qj5k18['get']['resBody']>(prefix, PATH10, GET, option).json().then(r => r.body),
      post: (option: { body: Methods_1qj5k18['post']['reqBody'], config?: T | undefined }) =>
        fetch(prefix, PATH10, POST, option).send(),
      $post: (option: { body: Methods_1qj5k18['post']['reqBody'], config?: T | undefined }) =>
        fetch(prefix, PATH10, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH10}`,
    },
    users: {
      _userId: (val1: number | string) => {
        const prefix1 = `${PATH11}/${val1}`;

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
        fetch<Methods_1xhiioa['get']['resBody']>(prefix, PATH11, GET, option).text(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1xhiioa['get']['resBody']>(prefix, PATH11, GET, option).text().then(r => r.body),
      $path: () => `${prefix}${PATH11}`,
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
