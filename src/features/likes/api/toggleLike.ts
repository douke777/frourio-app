import useSWRMutation from 'swr/mutation';

import apiClient from '@/lib/apiClient';

// TODO: add Debounce
export const useToggleLikeMutation = (postId: number) => {
  return useSWRMutation(apiClient.likes.$path(), () => apiClient.likes.$post({ body: { postId } }));
};
