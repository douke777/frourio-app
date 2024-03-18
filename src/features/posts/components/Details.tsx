// import { useSession } from 'next-auth/client';
import { memo, FC } from 'react';

import { LikeButton } from '@/components/Element/Button/LikeButton';

import { ApplyForm } from './ApplyForm';
import { ConstApplication } from './ConstApplication';
import { PostMain } from './Main';

export const PostDetails: FC = memo(() => {
  // const [session] = useSession();
  const session = true;

  const post = {
    id: 5,
    title: 'ホタテ',
    content: '食べたい',
    published: true,
    authorId: 1,
    categorySlug: 'programming',
    createdAt: '2024-02-11T11:57:24.444Z',
    updatedAt: '2024-02-11T11:57:24.444Z',
    user: {
      id: 1,
      email: 'admin@gmail.com',
      image: '',
      createdAt: '2024-02-11T11:57:24.444Z',
      updatedAt: '2024-02-11T11:57:24.444Z',
    },
  };

  return (
    <div className='border'>
      <PostMain post={post} />
      <LikeButton post={post} session={session} />
      <div className='-mt-3 text-center'>
        {session ? <ApplyForm post={post} /> : <ConstApplication />}
      </div>
    </div>
  );
});
