import { FC, memo } from 'react';

import { useParams } from 'react-router';

export const CategoryTitle: FC<{ category?: string }> = memo(({ category = '' }) => {
  const { slug } = useParams();
  const title = category ? category : slug?.toUpperCase();

  return <h1 className='pl-4 pt-10 text-2xl font-bold'>{title}</h1>;
});
