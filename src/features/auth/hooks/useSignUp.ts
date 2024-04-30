import { ChangeEvent, useState, useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { SignUpDto } from '$/types/auth';
import { convert, resolve } from '@/utils';

import { useSignUpMutation } from '../api';

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
  }) satisfies z.ZodType<SignUpDto>;

export const useSignUp = () => {
  const [image, setImage] = useState<string>('/avatar-default.png');
  const updateImage = (e: ChangeEvent<HTMLSelectElement>) => setImage(e.target.value);

  const { trigger: signUp, isMutating } = useSignUpMutation();

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<SignUpDto>({
    resolver: zodResolver(schema),
  });

  const handleSubmit: SubmitHandler<SignUpDto> = useCallback(
    async (data) => signUp(data),
    [signUp],
  );

  return {
    isMutating,
    image,
    updateImage,
    onSubmit: originalHandleSubmit(handleSubmit),
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
