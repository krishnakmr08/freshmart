import axios from 'axios';
import { BASE_URL } from './config';
import { refresh_tokens } from './authService';
import { tokenStorage } from '@state/storage';

export const appAxios = axios.create({
  baseURL: BASE_URL,
});

appAxios.interceptors.request.use(
  config => {
    const accessToken = tokenStorage.getString('accessToken');
         
    console.log(accessToken)
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    console.log('Request sent:', config.url);

    return config;
  },
  error => Promise.reject(error),
);

appAxios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      try {
        const newAccessToken = await refresh_tokens();

        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;

          return appAxios(error.config);
        }
      } catch (err) {
        console.log('Token refresh failed');
      }
    }
    if (error.response?.status !== 401) {
      console.log(error.response?.data?.message || 'Something went wrong');
    }

    return Promise.reject(error);
  },
);
