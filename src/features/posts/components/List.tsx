import { FC, memo } from 'react';

import { PostWithDetails } from '$/types';

import { PostItem } from './Item';

type Props = {
  posts: PostWithDetails[];
  className?: string;
};

export const PostList: FC<Props> = memo(({ posts, className }) => {
  return (
    <ul className={className}>
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </ul>
  );
});
