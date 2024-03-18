import { FC } from 'react';

import { PaginatedPostList } from '@/features/posts/components/PaginatedList';

import { CategoryTitle } from '@/components/Element/Category/CategoryTitle';

const Home: FC = () => {
  return (
    <>
      <CategoryTitle category='New Arrival' />
      <PaginatedPostList />
    </>
  );
};

export default Home;
