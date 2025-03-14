import {
  AuthResponse,
  authResponseSchema,
  LoginSchema,
  SignUpSchema,
  User,
} from '@/types/auth.types';
import { getErrorMessage } from '@/utils/errorHandler';
import { instance } from './instance.api';

export const authApi = {
  login: async (credentials: LoginSchema): Promise<AuthResponse> => {
    try {
      const { data } = await instance.post<AuthResponse>(
        '/auth/login',
        credentials
      );
      const parsedData = authResponseSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
      }
      return parsedData.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  signup: async (credentials: SignUpSchema): Promise<AuthResponse> => {
    try {
      const { data } = await instance.post<AuthResponse>(
        '/auth/signup',
        credentials
      );
      const parsedData = authResponseSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
      }
      return parsedData.data;
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
