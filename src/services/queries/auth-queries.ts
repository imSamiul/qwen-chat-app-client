import { authApi } from '@/api/auth.api';
import { getLocalAccessToken } from '@/utils/auth';
import { useQuery } from '@tanstack/react-query';

// Query for user data
export function useAuthQueries() {
  const getUserQuery = useQuery({
    queryKey: ['user'],
    queryFn: authApi.getUser,
    retry: 1,
    enabled: !!getLocalAccessToken(),
    refetchOnWindowFocus: false,
  });

  // Refresh token 10 seconds before expiry
  const refreshTokenQuery = useQuery({
    queryKey: ['refreshToken'],
    queryFn: authApi.refreshToken,
    retry: 3,
    enabled: !!getLocalAccessToken(),
    refetchInterval: 1000 * 60 * 25, // Refresh every 25 minutes (token expires in 30 minutes)
    staleTime: 0,
  });

  return { getUserQuery, refreshTokenQuery };
}
