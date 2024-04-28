import { FC } from 'react';

import { useUnAuthRedirect } from '@/features/auth/hooks/useUnAuthRedirect';
import { PostForm } from '@/features/posts/components/PostForm';

const PostNew: FC = () => {
  useUnAuthRedirect();

  return (
    <>
      <PostForm type='CREATE' />
    </>
  );
};

export default PostNew;
