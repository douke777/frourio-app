import { FC, memo } from 'react';

import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { Post } from '@/features/posts/types';

import { Icon } from '../Icon';

type Props = {
  session: true;
  post: Post;
};

export const LikeButton: FC<Props> = memo(({ session, post }) => {
  const data = { like: true };

  const activeLikeClassName = data?.like
    ? 'text-red-500 border-red-500 hover:opacity-50'
    : 'text-gray-400 border-gray-400';
  const activeLikeIconClassName = data?.like ? 'text-red-500' : '';

  return (
    <>
      {session && (
        <div className='flex h-14 items-center justify-end'>
          <button
            className={`mr-2 flex items-center justify-center rounded-full border p-2 hover:opacity-50 focus:outline-none ${activeLikeClassName}`}
            // onClick={handleLike}
          >
            <Icon icon={faHeart} className={activeLikeIconClassName} />
          </button>
        </div>
      )}
    </>
  );
});
