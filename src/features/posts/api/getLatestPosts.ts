import useSWR from 'swr';

import apiClient from '@/lib/apiClient';

export const useGetLatestPostsQuery = () => {
  return useSWR(apiClient.posts.$path(), apiClient.posts.$get, {
    suspense: true,
  });
};
