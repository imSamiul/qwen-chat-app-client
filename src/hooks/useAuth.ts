import { User } from '@/types/auth.types';
import { createContext, useContext } from 'react';

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string;
  isLoading: boolean;
  saveAccessToken: (accessToken: string) => void;
  clearAccessToken: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
