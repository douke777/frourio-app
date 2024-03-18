import { ChangeEvent, useState, useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import useLoadingStore from '@/stores/loading';

import { convert, resolve } from '@/utils';

type ErrorMessage = string | undefined;

const schema = z
  .object({
    image: z.string().min(1),
    name: z.string().min(1),
    email: z.string().min(1),
    password: z.string().min(8).max(12),
  })
  .refine((data) => data.email.includes('@'), {
    message: 'Please enter email',
    path: ['email'],
  });

type Inputs = z.infer<typeof schema>;

export const useSignUp = () => {
  const [image, setImage] = useState<string>('/avatar-default.png');
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>('');

  const toggleLoading = useLoadingStore((state) => state.toggleLoading);

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const updateImage = (e: ChangeEvent<HTMLSelectElement>) => setImage(e.target.value);

  const signUp: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      toggleLoading();

      // try {
      //   const body = { ...data, image };
      //   const res = await fetch('/api/user/create', {
      //     method: 'POST',
      //     body: JSON.stringify(body),
      //     headers: { 'Content-Type': 'application/json' },
      //   });
      //   if (!res.ok) {
      //     const { message } = await res.json();
      //     throw new Error(message);
      //   }

      //   setErrorMessage('');
      //   await signIn('credentials', {
      //     callbackUrl: '/',
      //     email: data.email,
      //     password: data.password,
      //   });
      // } catch (err) {
      //   console.error(err.message);
      //   setErrorMessage(err.message);
      // } finally {
      //   toggleLoading();
      // }
    },
    [toggleLoading, image],
  );

  return {
    image,
    errorMessage,
    updateImage,
    handleSubmit: originalHandleSubmit(signUp),
    fieldValues: {
      image: convert(register('image')),
      name: convert(register('name')),
      email: convert(register('email')),
      password: convert(register('password')),
    },
    errors: {
      image: resolve(errors.image),
      name: resolve(errors.name),
      email: resolve(errors.email),
      password: resolve(errors.password),
    },
  };
};
