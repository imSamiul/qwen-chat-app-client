import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useSendFriendRequest } from '@/services/mutations/friend-mutation';
import { User } from '@/types/auth.types';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useEffect } from 'react';
import { Button } from '../ui/button';

type SearchResultProps = {
  user: User;
  avatar: string;
  status: 'requested' | 'friend' | 'acceptRequest' | 'none';
};

function SearchResult({ user, avatar, status }: SearchResultProps) {
  const auth = useAuth();
  const {
    mutate: sendFriendRequest,
    isPending,
    error,
    isError,
    isSuccess,
  } = useSendFriendRequest();

  async function handleSendFriendRequest(user: User) {
    sendFriendRequest({
      recipientId: user._id!,
    });
  }

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error?.message,
      });
    }
    if (isSuccess) {
      toast({
        variant: 'default',
        title: 'Friend request sent',
        description: 'Your friend request has been sent successfully',
      });
    }
  }, [isError, error, isSuccess]);

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
          <p>Requested</p>
        ) : status === 'friend' ? (
          <Button variant='default'>Friend</Button>
        ) : status === 'acceptRequest' ? (
          <Button variant='secondary'>Accept Request</Button>
        ) : (
          <Button onClick={() => handleSendFriendRequest(user)}>
            {isPending ? 'Sending...' : 'Add Friend'}
          </Button>
        )}
      </div>
    </div>
  );
}

export default SearchResult;
