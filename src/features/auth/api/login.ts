// Loadingの代わりにisMutatingを使いたいからuseSWRMutationを使う
import { useNavigate } from 'react-router';
import useSWRMutation from 'swr/mutation';

import apiClient from '@/lib/apiClient';
import { successToast } from '@/lib/toast';

import { LoginDto } from '$/types/auth';

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useSWRMutation(
    apiClient.auth.login.$path(),
    (_key: string, { arg }: { arg: LoginDto }) => apiClient.auth.login.$post({ body: arg }),
    {
      onSuccess: () => {
        navigate('/');
        successToast('Login!');
      },
    },
  );
};
