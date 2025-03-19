import { notificationAPI } from '@/api/notification';
import { useQuery } from '@tanstack/react-query';

// Query for user data
export function useGetAllNotification() {
  return useQuery({
    queryKey: ['all-notification'],
    queryFn: () => notificationAPI.getNotification(),
  });
}
