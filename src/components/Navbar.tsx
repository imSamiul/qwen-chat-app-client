import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { socketService } from '../services/socket';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { NotificationBadge } from './ui/notification-badge';

interface FriendRequest {
  senderId: string;
  senderName: string;
  createdAt: string;
}

function Navbar() {
  const [notifications, setNotifications] = useState<FriendRequest[]>([]);
  const [notificationSeen, setNotificationSeen] = useState(true);

  useEffect(() => {
    const socket = socketService.getSocket();

    if (socket) {
      socket.on('newFriendRequest', (data: FriendRequest) => {
        setNotifications((prev) => [data, ...prev]);
        setNotificationSeen(false);
      });
    }

    return () => {
      socket?.off('newFriendRequest');
    };
  }, []);

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  console.log(notificationSeen);

  return (
    <div className='px-2 flex items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger onPointerDown={() => setNotificationSeen(true)}>
          <NotificationBadge
            label={
              notifications.length > 0 && !notificationSeen
                ? String(notifications.length)
                : undefined
            }
            className='bg-green-500'
          >
            <Bell
              size={20}
              fill={notifications.length > 0 ? 'blue' : '#edf6f9'}
              stroke={notifications.length > 0 ? 'blue' : 'black'}
            />
          </NotificationBadge>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='mx-2 w-72'>
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notifications.length === 0 ? (
            <DropdownMenuItem className='text-gray-500'>
              No new notifications
            </DropdownMenuItem>
          ) : (
            notifications.map((request, index) => (
              <DropdownMenuItem
                key={index}
                className='flex flex-col items-start py-2'
              >
                <span className='font-medium'>
                  {request.senderName} sent you a friend request
                </span>
                <span className='text-xs text-gray-500'>
                  {formatTime(request.createdAt)}
                </span>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Navbar;
