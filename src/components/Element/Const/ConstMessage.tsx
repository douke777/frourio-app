import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  message: string;
};

export const ConstMessage: FC<Props> = memo(({ message }) => {
  return (
    <div className='my-10 text-center text-sm text-gray-500 md:text-xl'>
      <Link to='/posts/new' className='hover:opacity-50'>
        {message}
      </Link>
    </div>
  );
});
