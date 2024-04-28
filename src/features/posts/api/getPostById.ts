import useSWR from 'swr';

import apiClient from '@/lib/apiClient';

export const useGetPostByIdQuery = (postId: string | undefined) => {
  return useSWR(
    postId ? apiClient.posts._postId(Number(postId)).$path() : null,
    () => apiClient.posts._postId(Number(postId)).$get(),
    {
      suspense: true,
    },
  );
};
