import useSWR from 'swr';

import apiClient from '@/lib/apiClient';

// TODO: userのid, emailは不要
export const useGetUserByIdQuery = (userId: string | undefined) => {
  return useSWR(
    userId ? apiClient.users._userId(userId).$path() : null,
    () => apiClient.users._userId(userId || '').$get(),
    {
      suspense: true,
    },
  );
};
