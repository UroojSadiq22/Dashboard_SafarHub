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
  Shield,
  Briefcase,
  LayoutDashboard,
  Heart,
  Plane,
  Settings,
  LogOut,
  BarChart,
  Users,
  Package,
  PlusCircle,
  MessageSquare,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser, useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Role = 'user' | 'agent' | 'admin';

const getMockRole = (email?: string | null): Role => {
  if (!email) return 'user';
  if (email.includes('admin')) return 'admin';
  if (email.includes('agent')) return 'agent';
  return 'user';
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading: isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const [role, setRole] = useState<Role>('user');

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
    if (user) {
      const userRole = getMockRole(user.email);
      setRole(userRole);
      
      const expectedPath = `/dashboard/${userRole}`;
      if (!pathname.startsWith(expectedPath) && pathname !== '/dashboard') {
         router.replace(expectedPath);
      } else if (pathname === '/dashboard') {
         router.replace(expectedPath);
      }

    }
  }, [user, isUserLoading, router, pathname]);

  const handleSignOut = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
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

  const displayName = user?.displayName || user?.email?.split('@')[0] || "Explorer";

  if (isUserLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading your dashboard...</p>
      </div>
    );
  }
  
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <MountainSnow className="h-6 w-6 text-primary" />
            <Link href="/">
              <span className="font-bold text-lg">SafarHub</span>
            </Link>
            <SidebarTrigger className="ml-auto" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          {role === 'admin' && (
             <SidebarGroup>
                <SidebarGroupLabel>Admin</SidebarGroupLabel>
                 <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Dashboard">
                            <Link href="/dashboard/admin">
                                <LayoutDashboard />
                                <span>Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
             </SidebarGroup>
          )}

          {role === 'agent' && (
            <SidebarGroup>
              <SidebarGroupLabel>Agent</SidebarGroupLabel>
              <SidebarMenu>
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
              </SidebarMenu>
            </SidebarGroup>
          )}
          
          {role === 'user' && (
             <SidebarGroup>
              <SidebarGroupLabel>My Account</SidebarGroupLabel>
              <SidebarMenu>
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
              </SidebarMenu>
            </SidebarGroup>
          )}

        </SidebarContent>
        <SidebarFooter>
            {user && (
                <div className='w-full'>
                    <div className="flex items-center gap-2 mb-4">
                        <Avatar>
                            <AvatarImage src={user.photoURL ?? `https://picsum.photos/seed/${user.uid}/40/40`} />
                            <AvatarFallback>{displayName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-semibold truncate">{displayName}</span>
                            <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                        </div>
                    </div>
                     <SidebarMenuButton onClick={handleSignOut} tooltip="Log Out">
                        <LogOut />
                        <span>Log Out</span>
                    </SidebarMenuButton>
                </div>
            )}
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
