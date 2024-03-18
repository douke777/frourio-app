import { FC, memo } from 'react';

import { PostItem } from './Item';
import { Post } from '../types';

type Props = {
  posts: Array<Post>;
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
