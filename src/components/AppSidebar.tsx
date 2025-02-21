import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from '@/components/ui/sidebar';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Link } from '@tanstack/react-router';
import { FaRegEdit } from 'react-icons/fa';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { NotificationBadge } from './ui/notification-badge';

// chat list
const generateDummyData = () => {
  const dummyData = [];
  for (let i = 1; i <= 100; i++) {
    dummyData.push({
      id: i,
      name: i % 3 === 0 ? `Group Chat ${i}` : `Friend ${i}`,
      lastMessage:
        i % 3 === 0
          ? `User ${i % 5}: Hello!`
          : i % 2 === 0
          ? 'You: Hi'
          : 'Typing...',
      timestamp:
        i % 3 === 0 ? '8.15 AM' : i % 2 === 0 ? '10.10 PM' : '5 min ago',
      unreadCount: i % 4 === 0 ? 0 : Math.floor(Math.random() * 10), // Random unread count
      isTyping: i % 5 === 0, // Randomly set typing status
      isGroup: i % 3 === 0, // Randomly set group chat
      avatarUrl: `https://github.com/shadcn${i % 10}.png`, // Random avatar URL
      showNotification: i % 6 === 0, // Randomly show notification
    });
  }
  return dummyData;
};

const chatData = generateDummyData();

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className='mt-2'>
        <div className='flex items-center justify-between px-2'>
          <h1 className='font-inter text-blue-800 font-bold text-2xl'>
            Qwen Chat
          </h1>
          <FaRegEdit size={20} />
        </div>
        <Button>All</Button>
        <Input placeholder='Search' />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='my-2'>
            <p className='text-base'>All Chats</p>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {chatData.map((chat) => (
              <Link
                key={chat.id}
                className='flex items-center gap-2 hover:bg-gray-100 p-2'
                to='/authenticated/chat/$chatId'
                params={{ chatId: chat.id.toString() }}
              >
                <NotificationBadge
                  show={chat.showNotification}
                  label=''
                  className='bg-green-500'
                >
                  <Avatar className='h-12 w-12 rounded-full'>
                    <AvatarImage
                      src={chat.avatarUrl}
                      className='rounded-full'
                    />
                    <AvatarFallback className='flex items-center justify-center w-full h-full rounded-full bg-gray-200 text-lg font-medium'>
                      {chat.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </NotificationBadge>
                <div className='flex-1'>
                  <div className='flex items-center justify-between'>
                    <h2 className='font-inter text-sm font-semibold'>
                      {chat.name}
                    </h2>
                    <p className='text-gray-500 text-[12px]'>
                      {chat.timestamp}
                    </p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <p className='font-inter text-[12px] font-medium text-blue-900'>
                      {chat.isTyping ? 'Typing...' : chat.lastMessage}
                    </p>
                    {chat.unreadCount > 0 && (
                      <p className='bg-blue-900 p-1 rounded text-white font-inter text-[8px] font-semibold'>
                        {chat.unreadCount}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
            <div className='flex items-center gap-2 hover:bg-gray-100 p-2'>
              <NotificationBadge show={false} label='' className='bg-green-500'>
                <Avatar className='h-12 w-12 rounded-full'>
                  <AvatarImage
                    src='https://github.com/shad'
                    className='rounded-full'
                  />
                  <AvatarFallback className='flex items-center justify-center w-full h-full rounded-full bg-gray-200 text-lg font-medium'>
                    cn
                  </AvatarFallback>
                </Avatar>
              </NotificationBadge>
              <div className='flex-1'>
                <div className='flex items-center justify-between'>
                  <h2 className='font-inter text-sm font-semibold'>
                    Group Chat
                  </h2>
                  <p className='text-gray-500 text-[12px]'>8.15 AM</p>
                </div>
                <div className='flex items-center justify-between'>
                  <p className='font-inter  text-[12px] font-medium text-blue-900'>
                    <span className='text-blue-900'>User 1:</span> Hello
                  </p>
                  <p className='bg-blue-900 p-1 rounded text-white font-inter text-[8px] font-semibold'>
                    4
                  </p>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-2 hover:bg-gray-100 p-2'>
              <NotificationBadge show={false} label='' className='bg-green-500'>
                <Avatar className='h-12 w-12 rounded-full'>
                  <AvatarImage
                    src='https://github.com/shad.png'
                    className='rounded-full'
                  />
                  <AvatarFallback className='flex items-center justify-center w-full h-full rounded-full bg-gray-200 text-lg font-medium'>
                    cn
                  </AvatarFallback>
                </Avatar>
              </NotificationBadge>
              <div className='flex-1'>
                <div className='flex items-center justify-between'>
                  <h2 className='font-inter text-sm font-semibold'>
                    Personal Chat
                  </h2>
                  <p className='text-gray-500 text-[12px]'>10.10 PM</p>
                </div>
                <div className='flex items-center justify-between'>
                  <p className='font-inter  text-[12px] font-medium text-blue-900'>
                    You: Hi
                  </p>
                  <p className='bg-blue-900 p-1 rounded text-white font-inter text-[8px] font-semibold'>
                    4
                  </p>
                </div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
