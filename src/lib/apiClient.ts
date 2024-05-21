import aspida from '@aspida/axios';
import axios from 'axios';

import api from '$/api/$api';

const baseURL = `${import.meta.env.VITE_API_URL}/api`;

axios.defaults.withCredentials = true;
export const apiClient = api(aspida(axios, { baseURL }));

export default apiClient;
