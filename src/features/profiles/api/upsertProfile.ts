import useSWRMutation from 'swr/mutation';

import apiClient from '@/lib/apiClient';
import { successToast } from '@/lib/toast';

import { EditingUserWithProfile } from '$/types/profiles';

export const useUpsertProfileMutation = () => {
  return useSWRMutation(
    apiClient.profiles.$path(),
    (_key: string, { arg }: { arg: EditingUserWithProfile }) =>
      apiClient.profiles.$post({ body: arg }),
    {
      onSuccess: () => {
        successToast('Success!');
      },
    },
  );
};
