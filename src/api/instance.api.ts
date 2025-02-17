import { router } from '@/main';
import {
  clearLocalAccessToken,
  getLocalAccessToken,
  saveLocalAccessToken,
} from '@/utils/auth';
import axios from 'axios';
import { authApi } from './auth.api';

// Base API URL from environment variables
const API_URL = `${import.meta.env.VITE_BASE_URL}/api`;

// Create an Axios instance with default configurations
const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Automatically include cookies (refresh token)
  headers: { 'Content-Type': 'application/json' },
});

// Request Interceptor: Attach Access Token
instance.interceptors.request.use((config) => {
  const token = getLocalAccessToken();
  if (token) {
    config.headers['x-auth-token'] = `${token}`;
  }
  return config;
});
export { instance };
// Response Interceptor: Handle Token Expiry
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { accessToken } = await authApi.refreshToken();
        saveLocalAccessToken(accessToken);
        originalRequest.headers['x-auth-token'] = `${accessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, clear everything and redirect
        clearLocalAccessToken();
        router.navigate({ to: '/authentication/login' });
        return Promise.reject(refreshError);
      }
    }

    // If error is 403 (no token) or any other error
    if (error.response?.status === 403) {
      clearLocalAccessToken();
      router.navigate({ to: '/authentication/login' });
    }

    return Promise.reject(error);
  }
);
