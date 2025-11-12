
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import {
  MountainSnow,
  LayoutDashboard,
  Plane,
  Settings,
  LogOut,
  Briefcase,
  PlusCircle,
  MessageSquare,
  Star,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { mockUserProfile } from '@/lib/mock-data';

type Role = 'user' | 'agent' | 'admin';

const getMockRoleFromPath = (pathname: string): Role => {
  if (pathname.startsWith('/dashboard/admin')) return 'admin';
  if (pathname.startsWith('/dashboard/agent')) return 'agent';
  return 'user';
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const [role, setRole] = useState<Role>('user');

  useEffect(() => {
    const currentRole = getMockRoleFromPath(pathname);
    setRole(currentRole);
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      toast({ title: "Logged out successfully!" });
      router.push("/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign out failed.",
        description: error.message,
      });
    }
  };

  const displayName = mockUserProfile.name;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <MountainSnow className="h-6 w-6 text-primary" />
          <Link href="/">
            <span>SafarHub</span>
          </Link>
          <SidebarTrigger className="ml-auto" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {role === 'admin' && (
              <SidebarGroup>
                <SidebarGroupLabel>Admin</SidebarGroupLabel>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Dashboard">
                    <Link href="/dashboard/admin">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Users">
                    <Link href="#">
                      <Users />
                      <span>Users</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Agents">
                    <Link href="#">
                      <Briefcase />
                      <span>Agents</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarGroup>
            )}

            {role === 'agent' && (
              <SidebarGroup>
                <SidebarGroupLabel>Agent</SidebarGroupLabel>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Dashboard">
                    <Link href="/dashboard/agent">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Create Package">
                    <Link href="/dashboard/agent/new-package">
                      <PlusCircle />
                      <span>Create Package</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="My Packages">
                    <Link href="/dashboard/agent/packages">
                      <Briefcase />
                      <span>My Packages</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Inquiries">
                    <Link href="/dashboard/agent/inquiries">
                      <MessageSquare />
                      <span>Inquiries</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Reviews">
                    <Link href="/dashboard/agent/reviews">
                      <Star />
                      <span>Reviews</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarGroup>
            )}

            {role === 'user' && (
              <SidebarGroup>
                <SidebarGroupLabel>My Account</SidebarGroupLabel>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Dashboard">
                    <Link href="/dashboard/user">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="My Bookings">
                    <Link href="/dashboard/user/bookings">
                      <Plane />
                      <span>My Bookings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="My Reviews">
                    <Link href="/dashboard/user/reviews">
                      <Star />
                      <span>My Reviews</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Profile">
                    <Link href="/dashboard/user/settings">
                      <Settings />
                      <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarGroup>
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`https://picsum.photos/seed/user-avatar/40/40`} />
              <AvatarFallback>{displayName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold truncate">{displayName}</span>
              <span className="text-xs text-muted-foreground truncate">{mockUserProfile.email}</span>
            </div>
          </div>
          <SidebarMenuButton onClick={handleSignOut} tooltip="Log Out">
            <LogOut />
            <span>Log Out</span>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className='p-4 md:p-8'>
          <motion.h1
            className='text-3xl font-bold mb-8'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome back, {displayName} 👋
          </motion.h1>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
