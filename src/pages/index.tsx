import { FC } from 'react';

import { useGetLatestPosts } from '@/features/posts/api/getLatestPosts';
import { PaginatedPostList } from '@/features/posts/components/PaginatedList';

import { CategoryTitle } from '@/components/Element/Category/CategoryTitle';

const Home: FC = () => {
  const { data: posts } = useGetLatestPosts();

  return (
    <>
      <CategoryTitle category='New Arrival' />
      <PaginatedPostList posts={posts} />
    </>
  );
};

export default Home;
