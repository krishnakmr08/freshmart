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

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

appAxios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refresh_tokens();

        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return appAxios(originalRequest);
        }
      } catch (err) {
        console.log('Token refresh failed');
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
