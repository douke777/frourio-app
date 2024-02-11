import type { AspidaClient } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_by08hd } from '.';
import type { Methods as Methods_1yrd359 } from './hi';
import type { Methods as Methods_1ft3bmu } from './likes';
import type { Methods as Methods_1kz9onh } from './posts';
import type { Methods as Methods_1bww5mg } from './posts/_postId';
import type { Methods as Methods_1xhiioa } from './users';
import type { Methods as Methods_1n5utkp } from './users/profiles';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:8888' : baseURL).replace(/\/$/, '');
  const PATH0 = '/hi';
  const PATH1 = '/likes';
  const PATH2 = '/posts';
  const PATH3 = '/users';
  const PATH4 = '/users/profiles';
  const GET = 'GET';
  const POST = 'POST';
  const DELETE = 'DELETE';
  const PATCH = 'PATCH';

  return {
    hi: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1yrd359['get']['resBody']>(prefix, PATH0, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1yrd359['get']['resBody']>(prefix, PATH0, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
    likes: {
      get: (option: { query: Methods_1ft3bmu['get']['query'], config?: T | undefined }) =>
        fetch(prefix, PATH1, GET, option).send(),
      $get: (option: { query: Methods_1ft3bmu['get']['query'], config?: T | undefined }) =>
        fetch(prefix, PATH1, GET, option).send().then(r => r.body),
      post: (option: { body: Methods_1ft3bmu['post']['reqBody'], config?: T | undefined }) =>
        fetch(prefix, PATH1, POST, option).send(),
      $post: (option: { body: Methods_1ft3bmu['post']['reqBody'], config?: T | undefined }) =>
        fetch(prefix, PATH1, POST, option).send().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_1ft3bmu['get']['query'] } | undefined) =>
        `${prefix}${PATH1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    posts: {
      _postId: (val1: number | string) => {
        const prefix1 = `${PATH2}/${val1}`;

        return {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1bww5mg['get']['resBody']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1bww5mg['get']['resBody']>(prefix, prefix1, GET, option).json().then(r => r.body),
          patch: (option: { body: Methods_1bww5mg['patch']['reqBody'], config?: T | undefined }) =>
            fetch(prefix, prefix1, PATCH, option).send(),
          $patch: (option: { body: Methods_1bww5mg['patch']['reqBody'], config?: T | undefined }) =>
            fetch(prefix, prefix1, PATCH, option).send().then(r => r.body),
          delete: (option: { body: Methods_1bww5mg['delete']['reqBody'], config?: T | undefined }) =>
            fetch(prefix, prefix1, DELETE, option).send(),
          $delete: (option: { body: Methods_1bww5mg['delete']['reqBody'], config?: T | undefined }) =>
            fetch(prefix, prefix1, DELETE, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1kz9onh['get']['resBody']>(prefix, PATH2, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1kz9onh['get']['resBody']>(prefix, PATH2, GET, option).json().then(r => r.body),
      post: (option: { body: Methods_1kz9onh['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1kz9onh['post']['resBody']>(prefix, PATH2, POST, option).json(),
      $post: (option: { body: Methods_1kz9onh['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1kz9onh['post']['resBody']>(prefix, PATH2, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH2}`,
    },
    users: {
      profiles: {
        post: (option: { body: Methods_1n5utkp['post']['reqBody'], config?: T | undefined }) =>
          fetch(prefix, PATH4, POST, option).send(),
        $post: (option: { body: Methods_1n5utkp['post']['reqBody'], config?: T | undefined }) =>
          fetch(prefix, PATH4, POST, option).send().then(r => r.body),
        $path: () => `${prefix}${PATH4}`,
      },
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1xhiioa['get']['resBody']>(prefix, PATH3, GET, option).text(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1xhiioa['get']['resBody']>(prefix, PATH3, GET, option).text().then(r => r.body),
      $path: () => `${prefix}${PATH3}`,
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
