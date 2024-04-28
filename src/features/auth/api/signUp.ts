import { useNavigate } from 'react-router';
import useSWRMutation from 'swr/mutation';

import apiClient from '@/lib/apiClient';
import { successToast } from '@/lib/toast';

import { SignUpDto } from '$/types/auth';

export const useSignUpMutation = () => {
  const navigate = useNavigate();

  return useSWRMutation(
    apiClient.auth.signup.$path(),
    (_key: string, { arg }: { arg: SignUpDto }) => apiClient.auth.signup.$post({ body: arg }),
    {
      onSuccess: () => {
        navigate('/auth/login');
        successToast('SignUp!');
      },
    },
  );
};
