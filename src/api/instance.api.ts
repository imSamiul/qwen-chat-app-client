import { router } from '@/main';
import {
  clearLocalAccessToken,
  getLocalAccessToken,
  saveLocalAccessToken,
} from '@/utils/auth';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BASE_URL}/api`;

// Create a separate instance for token refresh to avoid circular dependency
const refreshInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

async function refreshAccessToken(): Promise<string> {
  const { data } = await refreshInstance.post('/auth/refresh-token');
  return data.accessToken;
}

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use((config) => {
  const token = getLocalAccessToken();
  if (token) {
    config.headers['x-auth-token'] = `${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const accessToken = await refreshAccessToken();
        saveLocalAccessToken(accessToken);
        originalRequest.headers['x-auth-token'] = `${accessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        clearLocalAccessToken();
        router.navigate({ to: '/authentication/login' });
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 403) {
      clearLocalAccessToken();
      router.navigate({ to: '/authentication/login' });
    }

    return Promise.reject(error);
  }
);

export { instance };
