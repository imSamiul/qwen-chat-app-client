import { useSearchFriend } from '@/services/queries/friend-queries';
import { useDebounce } from '@uidotdev/usehooks';
import { LoaderIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import SearchResult from './SearchResult';

function AddFriend() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data, isLoading } = useSearchFriend(debouncedSearchTerm);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p>Add Friend</p>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Search User</DialogTitle>
          <DialogDescription>
            Give your friend user id below to add them as a friend
          </DialogDescription>
        </DialogHeader>
        <div>
          <div>
            <Label htmlFor='userId' className='text-right'>
              User ID
            </Label>
            <Input
              id='userId'
              value={searchTerm}
              className='my-2'
              placeholder='U-123456'
              onChange={handleInputChange}
            />
          </div>
          <div className='flex items-center justify-center my-4'>
            {isLoading ? (
              <LoaderIcon className='animate-spin' />
            ) : data ? (
              <SearchResult
                user={data.user}
                avatar={data.user.avatar}
                status={
                  data.isFriend
                    ? 'friend'
                    : data.hasSentRequest
                    ? 'requested'
                    : 'none'
                }
              />
            ) : (
              <p>No user found</p>
            )}
          </div>
        </div>
        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddFriend;
