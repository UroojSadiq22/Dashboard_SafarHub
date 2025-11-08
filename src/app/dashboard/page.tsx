'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useDoc } from '@/firebase/firestore/use-doc';

export default function DashboardRedirectPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const userDocRef = useMemoFirebase(
    () => (user && firestore ? doc(firestore, 'users', user.uid) : null),
    [user, firestore]
  );
  const { data: userData, isLoading: isUserDocLoading } = useDoc(userDocRef);

  const adminDocRef = useMemoFirebase(
    () => (user && firestore ? doc(firestore, 'roles_admin', user.uid) : null),
    [user, firestore]
  );
  const { data: adminData, isLoading: isAdminDocLoading } = useDoc(adminDocRef);

  useEffect(() => {
    const isLoading = isUserLoading || isUserDocLoading || isAdminDocLoading;
    if (isLoading) {
      return;
    }

    if (!user) {
      router.replace('/login');
      return;
    }

    if (adminData) {
      router.replace('/dashboard/admin');
    } else if (userData?.role === 'agent') {
      router.replace('/dashboard/agent');
    } else {
      router.replace('/dashboard/user');
    }
  }, [user, userData, adminData, isUserLoading, isUserDocLoading, isAdminDocLoading, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center p-8">
      <div className="w-full space-y-4">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-6 w-2/3" />
        <div className="pt-4">
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
}
