import { FC } from 'react';

import { SignUpForm } from '@/features/auth/components/SignUpForm';
import { useAuthRedirect } from '@/features/auth/hooks/useAuthRedirect';

const SignUp: FC = () => {
  useAuthRedirect();

  return (
    <>
      <SignUpForm />
    </>
  );
};

export default SignUp;
