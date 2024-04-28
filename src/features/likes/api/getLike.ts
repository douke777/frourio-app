import useSWR from 'swr';

import apiClient from '@/lib/apiClient';

export const useGetLikeQuery = (postId: number) => {
  return useSWR(apiClient.likes.$path(), () => apiClient.likes.$get({ query: { postId } }), {
    suspense: true,
  });
};
