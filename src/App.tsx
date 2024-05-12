import { Suspense, useEffect } from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';

import axios, { AxiosError } from 'axios';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/ReactToastify.min.css';

import { SWRConfig } from 'swr';

import apiClient from '@/lib/apiClient';
import { ErrorResponseData } from '@/lib/axios';
import { errorToast } from '@/lib/toast';

import { Loading } from '@/components/Element/Loading';
import { Layout } from '@/components/Layout/Layout';

import useStore from './stores/session';

// @ts-ignore
import routes from '~react-pages'; // NOTE: filebased routingを行うために、pages/はdefault exportが必要

const ErrorFallback = () => {
  return (
    <div
      className='text-red-500 w-screen h-screen flex flex-col justify-center items-center'
      role='alert'
    >
      <h2 className='text-lg font-semibold'>Ooops, something went wrong :( </h2>
      <button
        className='btn btn-error mt-4'
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </button>
    </div>
  );
};

export default function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const setSession = useStore((state) => state.setSession);

  useEffect(() => {
    (async () => {
      const csrfToken = await apiClient.auth.csrf.$get();
      axios.defaults.headers.common['csrf-token'] = csrfToken;
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await apiClient.auth.verify
        .$get()
        .then((user) => setSession(user))
        .catch(() => setSession(null));
    })();
  }, [setSession, pathname]);

  return (
    <>
      <Suspense
        fallback={
          <div className='flex items-center justify-center w-screen h-screen'>
            <Loading />
          </div>
        }
      >
        <ErrorBoundary fallback={<ErrorFallback />}>
          <HelmetProvider>
            <SWRConfig
              value={{
                shouldRetryOnError: false,
                revalidateOnFocus: false,
                onError: (err: AxiosError) => {
                  const data = err.response?.data as ErrorResponseData | undefined;
                  if (!data) return;

                  errorToast(data.message);
                  if (err.response?.status === 401 || err.response?.status === 403) {
                    navigate('/auth/login');
                  }
                },
              }}
            >
              <ToastContainer />
              <Layout>
                <Suspense
                  fallback={
                    <div className='h-full w-full flex items-center justify-center'>
                      <Loading />
                    </div>
                  }
                >
                  {useRoutes(routes)}
                </Suspense>
              </Layout>
            </SWRConfig>
          </HelmetProvider>
        </ErrorBoundary>
      </Suspense>
    </>
  );
}
