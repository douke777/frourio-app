import { useCallback, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { EditingUserWithProfile } from '$/types/profiles';
import { convert, resolve } from '@/utils';

import { useGetUserWithProfileQuery, useUpsertProfileMutation } from '../api';

const schema = z.object({
  name: z.string().min(1),
  bio: z.string().nullable(),
}) satisfies z.ZodType<EditingUserWithProfile>;

export const useEditProfile = () => {
  const { data } = useGetUserWithProfileQuery();
  const { trigger: upsertProfile, isMutating } = useUpsertProfileMutation();

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditingUserWithProfile>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data.name,
      bio: data.profile?.bio,
    },
  });

  useEffect(() => {
    reset({
      name: data.name,
      bio: data.profile?.bio,
    });
  }, [data, reset]);

  const handleSubmit: SubmitHandler<EditingUserWithProfile> = useCallback(
    async (data) => upsertProfile(data),
    [upsertProfile],
  );

  return {
    data,
    isMutating,
    onSubmit: originalHandleSubmit(handleSubmit),
    fieldValues: {
      name: convert(register('name')),
      bio: convert(register('bio')),
    },
    errors: {
      name: resolve(errors.name),
      bio: resolve(errors.bio),
    },
  };
};
