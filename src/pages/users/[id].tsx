import { FC } from 'react';

import { useParams } from 'react-router';

import { useGetUserByIdQuery } from '@/features/users/api';
import { Profile } from '@/features/users/components/Profile';
import { ResentPosts } from '@/features/users/components/ResentPosts';

const User: FC = () => {
  const { id: userId } = useParams();
  const { data: user } = useGetUserByIdQuery(userId);

  return (
    <>
      <div className='my-4 lg:my-12 lg:px-4'>
        <Profile user={user} />
        <ResentPosts posts={user.posts} />
      </div>
    </>
  );
};

export default User;
