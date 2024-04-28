import { FC } from 'react';

import { useGetLatestPostsQuery } from '@/features/posts/api/getLatestPosts';
import { PaginatedPostList } from '@/features/posts/components/PaginatedList';

import { CategoryTitle } from '@/components/Element/Category/CategoryTitle';

const Home: FC = () => {
  const { data: posts } = useGetLatestPostsQuery();

  return (
    <>
      <CategoryTitle category='New Arrival' />
      <PaginatedPostList posts={posts} />
    </>
  );
};

export default Home;
