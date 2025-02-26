import {
  AuthResponse,
  LoginCredentials,
  SignupCredentials,
  User,
} from '@/types/auth.types';
import { getErrorMessage } from '@/utils/errorHandler';
import { instance } from './instance.api';

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    try {
      const { data } = await instance.post<AuthResponse>(
        '/auth/login',
        credentials
      );
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    try {
      const { data } = await instance.post<AuthResponse>(
        '/auth/signup',
        credentials
      );
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  logout: async () => {
    try {
      const { data } = await instance.post('/auth/logout');
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  refreshToken: async (): Promise<{ accessToken: string }> => {
    try {
      const { data } = await instance.post('/auth/refresh-token');

      return data;
    } catch (error) {
      console.log(error);
      throw new Error(getErrorMessage(error));
    }
  },
  getUser: async (): Promise<User> => {
    try {
      const { data } = await instance.get('/auth/profile');
      return data.user;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};
