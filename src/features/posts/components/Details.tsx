import { memo, FC } from 'react';

import { LikeButton } from '@/features/likes/components/LikeButton';

import useStore from '@/stores/session';

import { PostWithDetails } from '$/types';

import { ApplyForm } from './ApplyForm';
import { ConstApplication } from './ConstApplication';
import { PostMain } from './Main';

type Props = {
  post: PostWithDetails;
};

export const PostDetails: FC<Props> = memo(({ post }) => {
  const session = useStore((state) => state.session);

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
