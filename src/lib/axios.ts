import axios from 'axios';

import { ErrorStatus } from '$/lib/error';

export const axiosGetFactory =
  <T>() =>
  (url: string) =>
    axios.get<T>(url).then((res) => res.data);

export const axiosPostFactory =
  <T>() =>
  (url: string, { args }: { args: T }) =>
    axios.post(url, args);

export type ErrorResponseData = {
  error: string;
  message: string;
  statusCode: ErrorStatus;
};
