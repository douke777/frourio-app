import { FC } from 'react';

import { PostList } from '@/features/posts/components/List';

import { ConstMessage } from '@/components/Element/Const';

import { UserWithDetails } from '$/types';

type Props = {
  posts: UserWithDetails['posts'];
};

export const ResentPosts: FC<Props> = ({ posts }) => {
  return (
    <>
      <h2 className='mb-2 border-b bg-white py-2 px-4 text-base font-bold text-black '>
        Recent Posts
      </h2>
      {posts.length ? (
        <div className='px-6 pb-5'>
          <PostList posts={posts} className='grid gap-4 md:grid-cols-2' />
        </div>
      ) : (
        <ConstMessage message='Not yet' />
      )}
    </>
  );
};
