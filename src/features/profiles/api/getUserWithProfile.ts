import useSWR from 'swr';

import apiClient from '@/lib/apiClient';

export const useGetUserWithProfileQuery = () => {
  return useSWR(apiClient.profiles.$path(), apiClient.profiles.$get, {
    suspense: true,
  });
};
