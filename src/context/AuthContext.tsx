import { AuthContext } from '@/hooks/useAuth';
import { useAuthQueries } from '@/services/queries/auth-queries';
import { socketService } from '@/services/socket';
import { getLocalAccessToken, saveLocalAccessToken } from '@/utils/auth';
import { useEffect, useState } from 'react';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getUserQuery, refreshTokenQuery } = useAuthQueries();
  const { data: user, isLoading, error } = getUserQuery;
  const [accessToken, setAccessToken] = useState<string | null>(
    getLocalAccessToken()
  );
  const { refetch } = refreshTokenQuery;
  const isAuthenticated = !!user;
  const contextValue = {
    user: user ? user : null,
    isAuthenticated,
    isLoading,
    error,
    accessToken: accessToken ? accessToken : '',
    saveAccessToken,
    clearAccessToken,
  };

  function saveAccessToken(accessToken: string) {
    setAccessToken(accessToken);
    saveLocalAccessToken(accessToken);
    socketService.connect(accessToken);
  }
  function clearAccessToken() {
    setAccessToken(null);
    saveLocalAccessToken('');
    socketService.disconnect();
  }

  useEffect(() => {
    if (accessToken) {
      socketService.connect(accessToken); // Initial connection
      refetch(); // Refresh user data if needed
    } else {
      socketService.disconnect();
    }
  }, [accessToken, refetch]);
  return (
    <AuthContext.Provider value={{ ...contextValue }}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
};
