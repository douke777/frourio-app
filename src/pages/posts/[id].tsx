import { FC } from 'react';

import { PostDetails } from '@/features/posts/components/Details';
import { RelatedPosts } from '@/features/posts/components/RelatedPosts';

const Post: FC = () => {
  return (
    <div className='w-screen md:max-w-screen-md lg:mx-4 lg:flex'>
      <div className='lg:mr-4 lg:w-7/12'>
        <PostDetails />
      </div>

      <div className='lg:w-5/12'>
        <RelatedPosts />
      </div>
    </div>
  );
};

export default Post;
