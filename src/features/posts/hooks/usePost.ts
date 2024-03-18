import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

import useLoadingStore from '@/stores/loading';

import { successToast, errorToast } from '@/lib/toast';

import { convert, resolve } from '@/utils';

import { Post } from '../types';

type Props = {
  type: 'CREATE' | 'UPDATE';
  post?: Post;
};

const schema = z.object({
  title: z.string().min(1).max(50),
  content: z.string().min(1).max(255),
  categorySlug: z.string().min(1, { message: 'Please select' }),
});

type Inputs = z.infer<typeof schema>;

type ReqBody = Inputs & { id?: number };

type ReqConfig = {
  uri: string;
  method: 'POST' | 'PUT' | '';
  body: ReqBody;
};

export const usePost = ({ type, post = undefined }: Props) => {
  // TODO: get session
  const navigate = useNavigate();

  const toggleLoading = useLoadingStore((state) => state.toggleLoading);

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: post?.title,
      content: post?.content,
      categorySlug: post?.categorySlug,
    },
  });

  const upsertPost: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      toggleLoading();

      console.log({ data });

      const config: ReqConfig = {
        uri: '',
        method: '',
        body: { ...data },
      };

      if (type === 'CREATE') {
        config.uri = '/api/post/create';
        config.method = 'POST';
      } else if (type === 'UPDATE') {
        config.uri = '/api/post/update';
        config.method = 'PUT';
        config.body = { ...config.body, id: post?.id };
      }

      try {
        const isValid = validate({ data: config.body, type });
        if (!isValid) throw new Error('Invalid Data');

        const { uri, method, body } = config;

        const res = await fetch(uri, {
          method,
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error('Failed');

        const post: Post = await res.json();

        navigate({
          pathname: `/posts/${post.id}`,
        });
        successToast('Success!');
      } catch (err) {
        console.error(err);
        errorToast('Failed');
      } finally {
        toggleLoading();
      }
    },
    [navigate, post?.id, toggleLoading, type],
  );

  const validate = ({ data, type }: { data: ReqBody; type: Props['type'] }): boolean => {
    const { id } = data;
    if (type === 'UPDATE') if (!id) return false;

    return true;
  };

  // useEffect(() => {
  //   if (!session) {
  //     errorToast('Signin required');

  //     const redirect = () => {
  //       router.push('/auth/signin');
  //     };
  //     setTimeout(redirect, 2000);
  //   }
  // }, [router, session]);

  return {
    handleSubmit: originalHandleSubmit(upsertPost),
    fieldValues: {
      title: convert(register('title')),
      content: convert(register('content')),
      categorySlug: convert(register('categorySlug')),
      reward: convert(register('reward', { valueAsNumber: true })),
    },
    errors: {
      title: resolve(errors.title),
      content: resolve(errors.content),
      categorySlug: resolve(errors.categorySlug),
      reward: resolve(errors.reward),
    },
  };
};
