import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '../ui/button';

type SearchResultProps = {
  username: string;
  avatar: string;
  status: 'requested' | 'friend' | 'none';
};

function SearchResult({ username, avatar, status }: SearchResultProps) {
  return (
    <div className='flex items-center justify-between p-2 w-full bg-gray-200 rounded'>
      <div className='flex items-center gap-2'>
        <Avatar className='h-12 w-12'>
          <AvatarImage src={avatar} alt={avatar} />
          <AvatarFallback className='flex items-center justify-center w-full h-full rounded-full bg-white text-lg font-medium'>
            CN
          </AvatarFallback>
        </Avatar>
        <p>{username}</p>
      </div>
      <div>
        {status === 'requested' ? (
          <p>Request Sent</p>
        ) : status === 'friend' ? (
          <p>Friend</p>
        ) : (
          <Button>Add Friend</Button>
        )}
      </div>
    </div>
  );
}

export default SearchResult;
