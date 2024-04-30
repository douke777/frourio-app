import { useSearchParams } from 'react-router-dom';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { convert } from '@/utils';

type Inputs = {
  q: string | null;
};

export const useSearch = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');

  const { register, handleSubmit: originalHandleSubmit } = useForm<Inputs>({
    defaultValues: { q },
  });

  const handleSubmit: SubmitHandler<Inputs> = async (data) => {
    navigate({
      pathname: '/search',
      search: `?q=${data.q}`,
    });
  };

  return {
    onSubmit: originalHandleSubmit(handleSubmit),
    fieldValues: {
      q: convert(register('q')),
    },
  };
};
