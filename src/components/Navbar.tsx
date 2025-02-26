import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { NotificationBadge } from './ui/notification-badge';

function Navbar() {
  return (
    <div className='px-2 flex items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <NotificationBadge label='' className='bg-green-500'>
            <Bell size={20} fill='blue' stroke='blue' />
          </NotificationBadge>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='mx-2'>
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Navbar;
