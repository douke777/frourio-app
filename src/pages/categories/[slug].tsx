import { FC } from 'react';

import { useParams } from 'react-router';

import { useGetPostsByCategoryQuery } from '@/features/posts/api/getPostsByCategory';
import { PaginatedPostList } from '@/features/posts/components/PaginatedList';

import { CategoryTitle } from '@/components/Element/Category/CategoryTitle';

const Categories: FC = () => {
  const { slug } = useParams();
  const { data: posts } = useGetPostsByCategoryQuery(slug);

  return (
    <>
      <CategoryTitle />
      <PaginatedPostList posts={posts} />
    </>
  );
};

export default Categories;
