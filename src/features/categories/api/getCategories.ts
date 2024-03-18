import axios from 'axios';
import useSWR from 'swr';

import apiClient from '@/lib/apiClient';

type Category = {
  id: number;
  slug: string;
};

const getCategories = (url: string) => axios.get<Category[]>(url).then((res) => res.data);

export const useCategories = () => {
  return useSWR(apiClient.categories.$path(), getCategories);
};
