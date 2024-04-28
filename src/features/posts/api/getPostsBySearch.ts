import useSWR from 'swr';

import apiClient from '@/lib/apiClient';

export const useGetPostsBySearchQuery = (q: string | null) => {
  return useSWR(
    apiClient.posts.search.$path() + `?q=${q}`,
    () => apiClient.posts.search.$get({ query: { q: q || '' } }),
    {
      suspense: true,
    },
  );
};
