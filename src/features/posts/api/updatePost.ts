import useSWRMutation from 'swr/mutation';

import apiClient from '@/lib/apiClient';
import { successToast } from '@/lib/toast';

import { EditingPost } from '$/types';

export const useUpdatePostMutation = (postId: string | undefined) => {
  return useSWRMutation(
    postId ? apiClient.posts._postId(postId).$path() : null,
    (_key: string, { arg }: { arg: EditingPost }) =>
      apiClient.posts._postId(postId || '').$patch({ body: arg }),
    {
      onSuccess: () => {
        successToast('Success!');
      },
    },
  );
};
