import { FC } from 'react';

import { LoginForm } from '@/features/auth/components/LoginForm';
import { useAuthRedirect } from '@/features/auth/hooks/useAuthRedirect';

const Login: FC = () => {
  useAuthRedirect();

  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
