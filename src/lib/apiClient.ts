import aspida from '@aspida/axios';
import axios from 'axios';

import api from '$/api/$api';

const baseURL = import.meta.env.PROD ? '/api' : 'http://localhost:8888/api';

axios.defaults.withCredentials = true;
export const apiClient = api(aspida(axios, { baseURL }));

export default apiClient;
