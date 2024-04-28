import type { AspidaClient } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_by08hd } from '.';
import type { Methods as Methods_163xhtc } from './auth';
import type { Methods as Methods_1kxgz87 } from './auth/csrf';
import type { Methods as Methods_19l45fu } from './auth/login';
import type { Methods as Methods_85qyf7 } from './auth/logout';
import type { Methods as Methods_1yes9ht } from './auth/signup';
import type { Methods as Methods_10yceks } from './auth/verify';
import type { Methods as Methods_ldtlk2 } from './categories';
import type { Methods as Methods_19d48bx } from './categories/_categoryId';
import type { Methods as Methods_1yrd359 } from './hi';
import type { Methods as Methods_1ft3bmu } from './likes';
import type { Methods as Methods_1kz9onh } from './posts';
import type { Methods as Methods_1bww5mg } from './posts/_postId';
import type { Methods as Methods_svgbni } from './posts/category';
import type { Methods as Methods_jtt32x } from './posts/related';
import type { Methods as Methods_7bpx52 } from './posts/search';
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
  const PATH5 = '/auth/verify';
  const PATH6 = '/categories';
  const PATH7 = '/hi';
  const PATH8 = '/likes';
  const PATH9 = '/posts';
  const PATH10 = '/posts/category';
  const PATH11 = '/posts/related';
  const PATH12 = '/posts/search';
  const PATH13 = '/profiles';
  const PATH14 = '/users';
  const GET = 'GET';
  const POST = 'POST';
  const DELETE = 'DELETE';
  const PATCH = 'PATCH';

  return {
    auth: {
      csrf: {
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1kxgz87['get']['resBody']>(prefix, PATH1, GET, option).text(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1kxgz87['get']['resBody']>(prefix, PATH1, GET, option).text().then(r => r.body),
        $path: () => `${prefix}${PATH1}`,
      },
      login: {
        post: (option: { body: Methods_19l45fu['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_19l45fu['post']['resBody']>(prefix, PATH2, POST, option).json(),
        $post: (option: { body: Methods_19l45fu['post']['reqBody'], config?: T | undefined }) =>
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
      verify: {
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_10yceks['get']['resBody']>(prefix, PATH5, GET, option).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_10yceks['get']['resBody']>(prefix, PATH5, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH5}`,
      },
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_163xhtc['get']['resBody']>(prefix, PATH0, GET, option).text(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_163xhtc['get']['resBody']>(prefix, PATH0, GET, option).text().then(r => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
    categories: {
      _categoryId: (val1: number | string) => {
        const prefix1 = `${PATH6}/${val1}`;

        return {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_19d48bx['get']['resBody']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_19d48bx['get']['resBody']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_ldtlk2['get']['resBody']>(prefix, PATH6, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_ldtlk2['get']['resBody']>(prefix, PATH6, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH6}`,
    },
    hi: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1yrd359['get']['resBody']>(prefix, PATH7, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1yrd359['get']['resBody']>(prefix, PATH7, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH7}`,
    },
    likes: {
      get: (option: { query: Methods_1ft3bmu['get']['query'], config?: T | undefined }) =>
        fetch<Methods_1ft3bmu['get']['resBody']>(prefix, PATH8, GET, option).json(),
      $get: (option: { query: Methods_1ft3bmu['get']['query'], config?: T | undefined }) =>
        fetch<Methods_1ft3bmu['get']['resBody']>(prefix, PATH8, GET, option).json().then(r => r.body),
      post: (option: { body: Methods_1ft3bmu['post']['reqBody'], config?: T | undefined }) =>
        fetch(prefix, PATH8, POST, option).send(),
      $post: (option: { body: Methods_1ft3bmu['post']['reqBody'], config?: T | undefined }) =>
        fetch(prefix, PATH8, POST, option).send().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_1ft3bmu['get']['query'] } | undefined) =>
        `${prefix}${PATH8}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    posts: {
      _postId: (val1: number | string) => {
        const prefix1 = `${PATH9}/${val1}`;

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
          fetch<Methods_svgbni['get']['resBody']>(prefix, PATH10, GET, option).json(),
        $get: (option: { query: Methods_svgbni['get']['query'], config?: T | undefined }) =>
          fetch<Methods_svgbni['get']['resBody']>(prefix, PATH10, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_svgbni['get']['query'] } | undefined) =>
          `${prefix}${PATH10}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
      related: {
        get: (option: { query: Methods_jtt32x['get']['query'], config?: T | undefined }) =>
          fetch<Methods_jtt32x['get']['resBody']>(prefix, PATH11, GET, option).json(),
        $get: (option: { query: Methods_jtt32x['get']['query'], config?: T | undefined }) =>
          fetch<Methods_jtt32x['get']['resBody']>(prefix, PATH11, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_jtt32x['get']['query'] } | undefined) =>
          `${prefix}${PATH11}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
      search: {
        get: (option: { query: Methods_7bpx52['get']['query'], config?: T | undefined }) =>
          fetch<Methods_7bpx52['get']['resBody']>(prefix, PATH12, GET, option).json(),
        $get: (option: { query: Methods_7bpx52['get']['query'], config?: T | undefined }) =>
          fetch<Methods_7bpx52['get']['resBody']>(prefix, PATH12, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_7bpx52['get']['query'] } | undefined) =>
          `${prefix}${PATH12}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1kz9onh['get']['resBody']>(prefix, PATH9, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1kz9onh['get']['resBody']>(prefix, PATH9, GET, option).json().then(r => r.body),
      post: (option: { body: Methods_1kz9onh['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1kz9onh['post']['resBody']>(prefix, PATH9, POST, option).json(),
      $post: (option: { body: Methods_1kz9onh['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1kz9onh['post']['resBody']>(prefix, PATH9, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH9}`,
    },
    profiles: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1qj5k18['get']['resBody']>(prefix, PATH13, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1qj5k18['get']['resBody']>(prefix, PATH13, GET, option).json().then(r => r.body),
      post: (option: { body: Methods_1qj5k18['post']['reqBody'], config?: T | undefined }) =>
        fetch(prefix, PATH13, POST, option).send(),
      $post: (option: { body: Methods_1qj5k18['post']['reqBody'], config?: T | undefined }) =>
        fetch(prefix, PATH13, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH13}`,
    },
    users: {
      _userId: (val1: number | string) => {
        const prefix1 = `${PATH14}/${val1}`;

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
        fetch<Methods_1xhiioa['get']['resBody']>(prefix, PATH14, GET, option).text(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1xhiioa['get']['resBody']>(prefix, PATH14, GET, option).text().then(r => r.body),
      $path: () => `${prefix}${PATH14}`,
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
