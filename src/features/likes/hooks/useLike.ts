import { PostWithDetails } from '$/types';

import { useGetLikeQuery, useToggleLikeMutation } from '../api';

export const useLike = (post: PostWithDetails) => {
  // TODO:サーバーからのエラーメッセージを表示するためのステートが必要
  const postId = post.id;
  const { data } = useGetLikeQuery(postId);
  const { trigger: toggleLike, isMutating } = useToggleLikeMutation(postId);

  return { data, isMutating, toggleLike };
};
