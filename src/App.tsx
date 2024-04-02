import { Suspense, useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';

import axios, { AxiosError } from 'axios';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/ReactToastify.min.css';

import { SWRConfig } from 'swr';

import apiClient from '@/lib/apiClient';
import { ErrorResponseData } from '@/lib/axios';
import { errorToast } from '@/lib/toast';

import { Loading } from '@/components/Element/Loading';
import { Layout } from '@/components/Layout/Layout';

import routes from '~react-pages'; // NOTE: filebased routingを行うために、pages/はdefault exportが必要

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { csrfToken } = await apiClient.auth.csrf.$get();
      axios.defaults.headers.common['csrf-token'] = csrfToken;
    })();
  }, []);

  return (
    <>
      <SWRConfig
        value={{
          shouldRetryOnError: false,
          revalidateOnFocus: false,
          onError: (err: AxiosError) => {
            const data = err.response?.data as ErrorResponseData | undefined;
            if (!data) return;

            errorToast(data.message);
            if (err.response?.status === 401 || err.response?.status === 403) {
              navigate('/');
            }
          },
        }}
      >
        <ToastContainer />
        <Layout>
          <Suspense fallback={<Loading />}>{useRoutes(routes)}</Suspense>
        </Layout>
      </SWRConfig>
    </>
  );
}
