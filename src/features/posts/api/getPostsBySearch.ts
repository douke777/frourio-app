import useSWR from 'swr';

import apiClient from '@/lib/apiClient';

export const useGetPostsBySearch = (q: string | null) => {
  return useSWR(
    apiClient.posts.search.$path(),
    () => apiClient.posts.search.$get({ query: { q: q || '' } }),
    {
      suspense: true,
    },
  );
};
