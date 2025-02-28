import { friendApi } from '@/api/friend.api';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useSendFriendRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ recipientId }: { recipientId: string }) =>
      friendApi.sendFriendRequest(recipientId),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['searchFriend'],
      });
    },
  });
}
