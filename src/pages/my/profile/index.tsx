import { FC } from 'react';

import { useUnAuthRedirect } from '@/features/auth/hooks/useUnAuthRedirect';
import { ProfileEditForm } from '@/features/profiles/components/EditForm';

const Profile: FC = () => {
  useUnAuthRedirect();

  return (
    <>
      <ProfileEditForm />
    </>
  );
};

export default Profile;
