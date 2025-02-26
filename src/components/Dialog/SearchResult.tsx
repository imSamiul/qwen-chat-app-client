import { useAuth } from '@/hooks/useAuth';
import { queryClient } from '@/main';
import { socketService } from '@/services/socket';
import { User } from '@/types/auth.types';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '../ui/button';

type SearchResultProps = {
  user: User;
  avatar: string;
  status: 'requested' | 'friend' | 'none';
};

function SearchResult({ user, avatar, status }: SearchResultProps) {
  const auth = useAuth();

  async function handleSendFriendRequest(user: User) {
    socketService.emit('sendFriendRequest', {
      recipientId: user._id,
      senderId: auth.user?._id,
    });
    await queryClient.invalidateQueries({
      queryKey: ['searchFriend', user.uniqueId],
    });
  }

  return (
    <div className='flex items-center justify-between p-2 w-full bg-gray-200 rounded'>
      <div className='flex items-center gap-2'>
        <Avatar className='h-12 w-12'>
          <AvatarImage src={avatar} alt={avatar} />
          <AvatarFallback className='flex items-center justify-center w-full h-full rounded-full bg-white text-lg font-medium'>
            CN
          </AvatarFallback>
        </Avatar>
        <p>{user.username}</p>
      </div>
      <div>
        {auth.user?.uniqueId === user.uniqueId ? (
          "It's You"
        ) : status === 'requested' ? (
          <p>Request Sent</p>
        ) : status === 'friend' ? (
          <p>Friend</p>
        ) : (
          <Button onClick={() => handleSendFriendRequest(user)}>
            Add Friend
          </Button>
        )}
      </div>
    </div>
  );
}

export default SearchResult;
