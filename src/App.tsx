import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { queryClient, router } from './main';

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </QueryClientProvider>
  );
}
