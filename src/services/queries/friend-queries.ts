import { friendApi } from '@/api/friend.api';
import { useQuery } from '@tanstack/react-query';

// Query for user data
export function useSearchFriend(uniqueId: string) {
  return useQuery({
    queryKey: ['searchFriend', uniqueId],
    queryFn: () => friendApi.searchFriend(uniqueId),
    enabled: !!uniqueId,
  });
}
