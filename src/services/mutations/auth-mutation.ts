import { authApi } from '@/api/auth.api';
import { useAuth } from '@/hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAuthMutation() {
  const queryClient = useQueryClient();
  const auth = useAuth();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      auth.saveAccessToken(data.accessToken);
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  // Signup mutation
  const signupMutation = useMutation({
    mutationFn: authApi.signup,
    onSuccess: (data) => {
      auth.saveAccessToken(data.accessToken);
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: async () => {
      auth.clearAccessToken();
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async () => {
      await queryClient.clear();
    },
  });

  return { loginMutation, signupMutation, logoutMutation };
}
