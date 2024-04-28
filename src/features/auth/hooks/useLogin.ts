import { useState, useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { LoginDto } from '$/types/auth';
import { convert, resolve } from '@/utils';

import { useLoginMutation } from '../api';

type ErrorMessage = string | undefined;

const schema = z
  .object({
    email: z.string().min(1),
    password: z.string().min(8).max(12),
  })
  .refine((data) => data.email.includes('@'), {
    message: 'Please enter email',
    path: ['email'],
  }) satisfies z.ZodType<LoginDto>;

export const useLogin = () => {
  // サーバーからのエラーメッセージを表示するためのステート
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>('');
  const { trigger: login, isMutating } = useLoginMutation();

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: zodResolver(schema),
  });

  const handleSubmit: SubmitHandler<LoginDto> = useCallback(async (data) => login(data), [login]);

  return {
    isMutating,
    errorMessage,
    onSubmit: originalHandleSubmit(handleSubmit),
    fieldValues: {
      email: convert(register('email')),
      password: convert(register('password')),
    },
    errors: {
      email: resolve(errors.email),
      password: resolve(errors.password),
    },
  };
};
