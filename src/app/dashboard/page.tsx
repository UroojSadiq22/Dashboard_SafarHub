'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // For a frontend-only app, we can just redirect to the user dashboard by default.
    // In a real app with roles, you'd check the user's role here.
    router.replace('/dashboard/user');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Loading your dashboard...</p>
    </div>
  );
}
