import { FC, memo } from 'react';

import { ConstMessage } from '@/components/Element/Const';

import { PostWithDetails } from '$/types';

import { PostList } from './List';

type Props = {
  relatedPosts: PostWithDetails[];
};

export const RelatedPosts: FC<Props> = memo(({ relatedPosts }) => {
  return (
    <div className='mb-4'>
      <h2 className='mb-4 border-b-2 bg-white py-2 px-4 text-sm font-bold text-black'>
        Related Posts
      </h2>
      <div className='mx-2 flex justify-center'>
        {relatedPosts.length ? (
          <PostList posts={relatedPosts} className='grid gap-4 md:grid-cols-2 lg:grid-cols-1' />
        ) : (
          <ConstMessage message='No posts yet' />
        )}
      </div>
    </div>
  );
});
