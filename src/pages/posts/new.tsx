import { FC } from 'react';

import { PostForm } from '@/features/posts/components/PostForm';

const PostNew: FC = () => {
  return (
    <>
      <PostForm type='CREATE' />
    </>
  );
};

export default PostNew;
