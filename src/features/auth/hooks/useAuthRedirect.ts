import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useStore from '@/stores/session';

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const session = useStore((state) => state.session);

  useEffect(() => {
    if (session) navigate('/');
  }, [navigate, session]);
};
