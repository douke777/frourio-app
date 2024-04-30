import { FC, memo } from 'react';

import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { Session } from '@/stores/session';

import { Icon } from '@/components/Element/Icon';

import { PostWithDetails } from '$/types';

import { useLike } from '../hooks/useLike';

type Props = {
  post: PostWithDetails;
  session: Session;
};

export const LikeButton: FC<Props> = memo(({ post, session }) => {
  const { like, handleLike } = useLike(post, session);

  const activeLikeClassName = like
    ? 'text-red-500 border-red-500 hover:opacity-50'
    : 'text-gray-400 border-gray-400';
  const activeLikeIconClassName = like ? 'text-red-500' : '';

  return (
    <>
      {session && (
        <div className='flex h-14 items-center justify-end'>
          <button
            className={`mr-2 flex items-center justify-center rounded-full border p-2 hover:opacity-50 focus:outline-none ${activeLikeClassName}`}
            onClick={() => handleLike()}
          >
            <Icon icon={faHeart} className={activeLikeIconClassName} />
          </button>
        </div>
      )}
    </>
  );
});
