'use client';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Role = 'user' | 'agent' | 'admin';

const getMockRole = (email?: string | null): Role => {
  if (!email) return 'user';
  if (email.includes('admin')) return 'admin';
  if (email.includes('agent')) return 'agent';
  return 'user';
}

export default function DashboardRedirectPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        const role = getMockRole(user.email);
        router.replace(`/dashboard/${role}`);
      } else {
        router.replace('/login');
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Loading your dashboard...</p>
    </div>
  );
}
