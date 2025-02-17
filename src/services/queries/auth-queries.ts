import { authApi } from '@/api/auth.api';
import { getLocalAccessToken } from '@/utils/auth';
import { useQuery } from '@tanstack/react-query';

// Query for user data
export function useAuthQueries() {
  const getUserQuery = useQuery({
    queryKey: ['user'],
    queryFn: authApi.getUser,
    retry: false,
    enabled: !!getLocalAccessToken(),
    refetchOnWindowFocus: false,
  });
  const refreshTokenQuery = useQuery({
    queryKey: ['refreshToken'],
    queryFn: authApi.refreshToken,
    retry: false,
    enabled: !!getLocalAccessToken(),
    refetchInterval: 1000 * 60 * 14, // 14 minutes
  });
  return { getUserQuery, refreshTokenQuery };
}
