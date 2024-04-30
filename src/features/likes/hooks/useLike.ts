import { Session } from '@/stores/session';

import { PostWithDetails } from '$/types';

import { useGetLikeQuery, useToggleLikeMutation } from '../api';

export const useLike = (post: PostWithDetails, session: Session) => {
  const postId = post.id;
  const { data } = useGetLikeQuery(postId, session);
  const { trigger: toggleLike, isMutating } = useToggleLikeMutation(postId);

  return { data, isMutating, toggleLike };
};
