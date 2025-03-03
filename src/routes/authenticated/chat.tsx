import { AppSidebar } from '@/components/AppSidebar';
import Navbar from '@/components/Navbar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/authenticated/chat')({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/authentication/login',
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className='px-2 py-4 flex justify-between '>
            <SidebarTrigger />
            <Navbar />
          </div>
          <Separator />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
