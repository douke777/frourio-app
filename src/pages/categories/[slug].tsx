import { FC } from 'react';

import { PaginatedPostList } from '@/features/posts/components/PaginatedList';

import { CategoryTitle } from '@/components/Element/Category/CategoryTitle';

const Categories: FC = () => {
  return (
    <>
      <CategoryTitle />
      <PaginatedPostList />
    </>
  );
};

export default Categories;
