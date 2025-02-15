import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import { useState } from 'react';

export const Route = createFileRoute('/search-user')({
  component: RouteComponent,
});

function RouteComponent() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<{ _id: string; username: string }[]>([]);

  const handleSearch = async () => {
    const { data } = await axios.get(`/api/users/search?username=${query}`);
    setUsers(data);
  };
  return (
    <div className='p-4'>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search users by username'
        className='p-2 border rounded w-full mb-4'
      />
      <button
        onClick={handleSearch}
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        Search
      </button>

      <ul className='mt-4 space-y-2'>
        {users.map((user) => (
          <li key={user._id} className='flex justify-between items-center'>
            <span>{user.username}</span>
            <button
              // onClick={() => onAddFriend(user._id)}
              className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600'
            >
              Add Friend
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
