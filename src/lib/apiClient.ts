import aspida from '@aspida/axios';
import axios from 'axios';

import api from '$/api/$api';

axios.defaults.withCredentials = true;
export const apiClient = api(aspida(axios, { baseURL: 'http://localhost:8888' }));

export default apiClient;
