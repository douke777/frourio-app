import useSWR from 'swr';

import apiClient from '@/lib/apiClient';

// TODO: userのid, emailは不要
export const useGetUserWithProfileQuery = () => {
  return useSWR(apiClient.profiles.$path(), apiClient.profiles.$get, {
    suspense: true,
  });
};
