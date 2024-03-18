import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

import useLoadingStore from '@/stores/loading';

import { convert, resolve } from '@/utils';

const schema = z.object({
  message: z.string().min(1).max(255),
});

type Inputs = z.infer<typeof schema>;

type RequestBody = {
  message: string;
  postId: number;
};

export const useApplyPost = (post: { id: number }) => {
  const navigate = useNavigate();
  const toggleLoading = useLoadingStore((state) => state.toggleLoading);

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const applyPost: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      toggleLoading();

      const body: RequestBody = {
        ...data,
        postId: post.id,
      };

      console.log({ body });

      // try {
      //   await fetch('/api/post/apply', {
      //     method: 'POST',
      //     body: JSON.stringify(body),
      //     headers: { 'Content-Type': 'application/json' },
      //   });
      //   navigate('/mypage');
      //   successToast('Success!');
      // } catch (err) {
      //   console.error(err);
      //   errorToast('Failed');
      // } finally {
      //   toggleLoading();
      // }
    },
    [navigate, post.id, toggleLoading],
  );

  return {
    handleSubmit: originalHandleSubmit(applyPost),
    fieldValues: {
      message: convert(register('message')),
    },
    errors: {
      message: resolve(errors.message),
    },
  };
};
