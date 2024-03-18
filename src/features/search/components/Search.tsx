import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

type Inputs = {
  q: string | null;
};

export const SearchForm: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');

  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: { q },
  });

  const searchPosts: SubmitHandler<Inputs> = async (data) => {
    navigate({
      pathname: '/search',
      search: `?q=${data.q}`,
    });
    reset();
  };

  return (
    <form className='form-control' onSubmit={handleSubmit(searchPosts)}>
      <div className='join'>
        <input
          {...register('q')}
          type='search'
          placeholder='Search…'
          className='input-bordered input join-item'
        />
        <button className='btn btn-square join-item' type='submit'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </button>
      </div>
    </form>
  );
};
