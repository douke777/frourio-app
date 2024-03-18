import { useNavigate } from 'react-router';
import useSWR from 'swr';

import apiClient from '@/lib/apiClient';
import { axiosGetFactory } from '@/lib/axios';

import { Post } from '../types';

const getPosts = axiosGetFactory<Post[]>();

export const usePosts = () => {
  const navigate = useNavigate();

  return useSWR(apiClient.posts.$path(), getPosts, {
    suspense: true,
  });
};
