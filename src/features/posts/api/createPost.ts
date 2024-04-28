import { useNavigate } from 'react-router';
import useSWRMutation from 'swr/mutation';

import apiClient from '@/lib/apiClient';
import { successToast } from '@/lib/toast';

import { CreatingPost } from '$/types';

export const useCreatePostMutation = () => {
  const navigate = useNavigate();

  return useSWRMutation(
    apiClient.posts.$path(),
    (_key: string, { arg }: { arg: CreatingPost }) => apiClient.posts.$post({ body: arg }),
    {
      onSuccess: (post) => {
        navigate(`/posts/${post.id}`);
        successToast('Create Post!');
      },
    },
  );
};
