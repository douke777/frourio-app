import api from '../../server/api/$api';
import aspida from '@aspida/axios';
import axios from 'axios';

export const apiClient = api(
  aspida(axios, { baseURL: 'http://localhost:8888' })
);

export default apiClient;
