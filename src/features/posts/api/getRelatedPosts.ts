import useSWR from 'swr';

import apiClient from '@/lib/apiClient';

export const useGetRelatedPostsQuery = (postId: string | undefined) => {
  return useSWR(
    postId ? apiClient.posts.related.$path() : null,
    () => apiClient.posts.related.$get({ query: { postId: Number(postId) } }),
    {
      suspense: true,
    },
  );
};
