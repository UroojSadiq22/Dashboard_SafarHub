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
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser, useFirestore, useMemoFirebase, useAuth } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { signOut } from 'firebase/auth';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const firestore = useFirestore();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const userDocRef = useMemoFirebase(
    () => (user && firestore ? doc(firestore, 'users', user.uid) : null),
    [user, firestore]
  );
  const { data: userData } = useDoc(userDocRef);
  const role = userData?.role;

  const adminDocRef = useMemoFirebase(
    () => (user && firestore ? doc(firestore, 'roles_admin', user.uid) : null),
    [user, firestore]
  );
  const { data: adminData } = useDoc(adminDocRef);
  const isAdmin = !!adminData;

  const handleSignOut = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      toast({ title: "Signed out successfully." });
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign out failed.",
        description: error.message,
      });
    }
  };


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
          
          {isAdmin && (
            <SidebarGroup>
              <SidebarGroupLabel>Admin</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Verify Agents">
                    <Link href="/dashboard/admin">
                      <Shield />
                      <span>Verify Agents</span>
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
                  <SidebarMenuButton asChild tooltip="My Packages">
                    <Link href="/dashboard/agent">
                      <Briefcase />
                      <span>My Packages</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Bookings">
                    <Link href="/dashboard/agent/bookings">
                      <LayoutDashboard />
                      <span>Bookings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          )}

          
          {(role === 'user' || role === 'agent' || isAdmin) && (
             <SidebarGroup>
              <SidebarGroupLabel>My Account</SidebarGroupLabel>
              <SidebarMenu>
                 {role === 'user' &&
                    <>
                        <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="My Bookings">
                            <Link href="/dashboard/user">
                            <Plane />
                            <span>My Bookings</span>
                            </Link>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Wishlist">
                            <Link href="/dashboard/user/wishlist">
                            <Heart />
                            <span>Wishlist</span>
                            </Link>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                    </>
                 }
                 <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Account Settings">
                    <Link href="/dashboard/user/settings">
                      <Settings />
                      <span>Settings</span>
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
                            <AvatarFallback>{user.displayName?.[0] ?? user.email?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-semibold truncate">{user.displayName ?? 'User'}</span>
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
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
