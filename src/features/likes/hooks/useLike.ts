import { useState } from 'react';

import { useDebouncedCallback } from 'use-debounce';

import { Session } from '@/stores/session';

import { PostWithDetails } from '$/types';

import { useGetLikeQuery, useToggleLikeMutation } from '../api';

export const useLike = (post: PostWithDetails, session: Session) => {
  const postId = post.id;
  const { data: initialLike } = useGetLikeQuery(postId, session);
  const [currentLike, setCurrentLike] = useState(initialLike);

  const { trigger } = useToggleLikeMutation(postId);
  const debouncedToggleLike = useDebouncedCallback(trigger, 500);

  const handleLike = () => {
    setCurrentLike((prev) => !prev);
    debouncedToggleLike();
  };

  return { like: currentLike, handleLike };
};
