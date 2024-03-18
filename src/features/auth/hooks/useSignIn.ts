import { useState, useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
// import { signIn } from 'next-auth/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import useLoadingStore from '@/stores/loading';

import { convert, resolve } from '@/utils';

type ErrorMessage = string | undefined;

const schema = z
  .object({
    email: z.string().min(1),
    password: z.string().min(8).max(12),
  })
  .refine((data) => data.email.includes('@'), {
    message: 'Please enter email',
    path: ['email'],
  });

type Inputs = z.infer<typeof schema>;

export const useSignIn = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>('');

  const toggleLoading = useLoadingStore((state) => state.toggleLoading);

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const signInByCredentials: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      toggleLoading();

      const { email, password } = data;

      console.log(email, password);

      // Promise.resolve(
      //   signIn('credentials', {
      //     redirect: false,
      //     email,
      //     password,
      //   }),
      // )
      //   .then((res) => {
      //     if (res?.error) setErrorMessage(res.error);
      //   })
      //   .catch((res) => {
      //     console.error(res);
      //   })
      //   .finally(() => {
      //     toggleLoading();
      //   });
    },
    [toggleLoading],
  );

  return {
    errorMessage,
    handleSubmit: originalHandleSubmit(signInByCredentials),
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
