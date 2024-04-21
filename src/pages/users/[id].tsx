import { FC } from 'react';

import { PostList } from '@/features/posts/components/List';

import { Avatar } from '@/components/Element/Avatar';
import { ConstMessage } from '@/components/Element/Const';

import { user } from '@/data';

// TODO：コンポネント化する
const User: FC = () => {
  const { posts, profile, image, name } = user;

  return (
    <>
      <div className='my-4 lg:my-12 lg:px-4'>
        <div className='mx-4 lg:mx-2 lg:mr-10 lg:text-left'>
          <div className='flex items-center'>
            <div className='flex flex-col'>
              <Avatar
                src={image ? image : '/avatar-default.png'}
                size={100}
                className='w-24 ring ring-primary ring-offset-2 ring-offset-base-100'
              />
            </div>

            <div className='flex flex-col'>
              <p className='ml-4 text-xl font-bold lg:text-3xl'>{name}</p>
            </div>
          </div>

          {profile?.bio ? (
            <div className='mt-4 mb-8 h-40 break-words rounded-lg border py-4 px-6 leading-relaxed'>
              {profile.bio}
            </div>
          ) : (
            <div className='mt-4 mb-8 h-14 break-words rounded-lg border py-4 px-6 leading-relaxed text-gray-500'>
              No content
            </div>
          )}
        </div>

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
      </div>
    </>
  );
};

export default User;
