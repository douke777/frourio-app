import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { CreatingPost } from '$/types';
import { convert, resolve } from '@/utils';

import { useCreatePostMutation } from '../api';

// type Props = {
//   type: 'CREATE' | 'UPDATE';
//   post?: PostWithDetails;
// };

const schema = z.object({
  title: z.string().min(1).max(50),
  content: z.string().min(1).max(255),
  published: z.boolean(),
  categorySlug: z.string().min(1, { message: 'Please select' }),
}) satisfies z.ZodType<CreatingPost>;

// TODO: add update post
export const usePost = () => {
  const { trigger: createPost, isMutating } = useCreatePostMutation();

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<CreatingPost>({
    resolver: zodResolver(schema),
    defaultValues: {
      published: true,
    },
  });

  const handleSubmit: SubmitHandler<CreatingPost> = useCallback(
    async (data) => createPost(data),
    [createPost],
  );

  return {
    isMutating,
    onSubmit: originalHandleSubmit(handleSubmit),
    fieldValues: {
      title: convert(register('title')),
      content: convert(register('content')),
      categorySlug: convert(register('categorySlug')),
    },
    errors: {
      title: resolve(errors.title),
      content: resolve(errors.content),
      categorySlug: resolve(errors.categorySlug),
    },
  };
};
