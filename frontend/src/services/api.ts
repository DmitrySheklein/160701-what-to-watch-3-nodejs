import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getToken } from './token';

const BACKEND_URL = 'http://localhost:5000';
const REQUEST_TIMEOUT = 5000;

export const createAPI = () => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => Promise.reject(error)
  );

  return api;
};
