import { useGetAllNotification } from '@/services/queries/notification-queries';
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

interface Notification {
  _id: string;
  type: string;
  sender: string;
  recipient: string;
  createdAt: string;
  updatedAt: string;
  isRead: boolean;
  __v: number;
}

function Navbar() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { data: notificationData } = useGetAllNotification();
  // const { mutate: markAsRead } = useMarkNotificationRead();

  useEffect(() => {
    if (notificationData) {
      setNotifications(notificationData);
    }
  }, [notificationData]);

  useEffect(() => {
    const socket = socketService.getSocket();

    if (socket) {
      socket.on('newFriendRequest', (data: Notification) => {
        setNotifications((prev) => [data, ...prev]);
      });
    }

    return () => {
      socket?.off('newFriendRequest');
    };
  }, []);

  const handleNotificationClick = () => {
    const unreadNotifications = notifications
      .filter((n) => !n.isRead)
      .map((n) => n._id);
    if (unreadNotifications.length > 0) {
      // markAsRead(unreadNotifications);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const hasUnreadNotifications = notifications.some((n) => !n.isRead);

  return (
    <div className='px-2 flex items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger onClick={handleNotificationClick}>
          <NotificationBadge
            label={
              hasUnreadNotifications
                ? String(notifications.filter((n) => !n.isRead).length)
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
          <DropdownMenuLabel className='flex justify-between'>
            Notifications
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          {notifications.length === 0 ? (
            <DropdownMenuItem className='text-gray-500'>
              No new notifications
            </DropdownMenuItem>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification._id}
                className='flex flex-col items-start py-2'
              >
                <span className='font-medium'>
                  {notification.type === 'friend_request'
                    ? 'You received a friend request'
                    : 'New notification'}
                </span>
                <span className='text-xs text-gray-500'>
                  {formatTime(notification.createdAt)}
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
