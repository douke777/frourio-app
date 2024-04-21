import { FC, memo } from 'react';

import { useParams } from 'react-router';

import { ConstMessage } from '@/components/Element/Const';

import { PostList } from './List';
import { useGetRelatedPosts } from '../api/getRelatedPosts';

export const RelatedPosts: FC = memo(() => {
  const { id: postId } = useParams();
  const { data: posts } = useGetRelatedPosts(postId);

  return (
    <div className='mb-4'>
      <h2 className='mb-4 border-b-2 bg-white py-2 px-4 text-sm font-bold text-black'>
        Related Posts
      </h2>
      <div className='mx-2 flex justify-center'>
        {posts.length ? (
          <PostList posts={posts} className='grid gap-4 md:grid-cols-2 lg:grid-cols-1' />
        ) : (
          <ConstMessage message='No posts yet' />
        )}
      </div>
    </div>
  );
});
