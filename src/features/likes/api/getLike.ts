import useSWR from 'swr';

import { Session } from '@/stores/session';

import apiClient from '@/lib/apiClient';

export const useGetLikeQuery = (postId: number, session: Session) => {
  return useSWR(
    session ? apiClient.likes.$path() : null,
    () => apiClient.likes.$get({ query: { postId } }),
    {
      suspense: true,
    },
  );
};
