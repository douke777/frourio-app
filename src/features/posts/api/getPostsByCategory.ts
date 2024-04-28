import useSWR from 'swr';

import apiClient from '@/lib/apiClient';

export const useGetPostsByCategoryQuery = (categorySlug: string | undefined) => {
  return useSWR(
    categorySlug ? apiClient.posts.category.$path() + `?categorySlug=${categorySlug}` : null,
    () => apiClient.posts.category.$get({ query: { categorySlug: categorySlug || '' } }),
    {
      suspense: true,
    },
  );
};
