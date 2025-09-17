import axios from 'axios';
import { Api } from '../constants/api.const';

export const externalAPI = axios.create({
  baseURL: Api.API_BASE_URL,
  timeout: Api.MAX_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

externalAPI.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
