import { FC } from 'react';
import { Link } from 'react-router-dom';

import { SearchForm } from '../../search/components/Search';
import { useGetCategoriesQuery } from '../api';

export const DrawerSide: FC = () => {
  const { data: categories } = useGetCategoriesQuery();

  return (
    <div className='drawer-side'>
      <label htmlFor='my-drawer-3' className='drawer-overlay'></label>
      <ul className='menu w-80 bg-base-100 p-4 min-h-full'>
        <li className='md:hidden'>
          <SearchForm />
        </li>
        {categories?.map(({ slug }) => (
          <li key={slug}>
            <Link to={`/categories/${slug}`}>{slug.toUpperCase()}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
