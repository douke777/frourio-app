import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PaginatedPostList } from '@/features/posts/components/PaginatedList';

import { posts } from '@/data';

const SearchPage: FC = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');

  return (
    <>
      <div className='mb-6'>
        <h1 className='flex items-center pl-4 pt-4 text-2xl font-bold'>
          {q ? <h2>Search results for &quot;{q}&quot;</h2> : <h2>Recommend Posts</h2>}
          <p className='ml-6 lg:text-lg'>{posts.length} posts</p>
        </h1>

        <PaginatedPostList />
      </div>
    </>
  );
};

export default SearchPage;
