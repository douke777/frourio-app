import useSWR from 'swr';

import apiClient from '@/lib/apiClient';

export const useGetCategoriesQuery = () => {
  return useSWR(apiClient.categories.$path(), apiClient.categories.$get, { suspense: true });
};
