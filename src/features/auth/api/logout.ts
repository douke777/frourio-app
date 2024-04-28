import { useNavigate } from 'react-router';
import useSWRMutation from 'swr/mutation';

import useStore from '@/stores/session';

import apiClient from '@/lib/apiClient';
import { successToast } from '@/lib/toast';

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const setSession = useStore((state) => state.setSession);

  return useSWRMutation(
    apiClient.auth.logout.$path(),
    (_key: string) => apiClient.auth.logout.$post(),
    {
      onSuccess: () => {
        setSession(null);
        navigate('/auth/login');
        successToast('Logout!');
      },
    },
  );
};
