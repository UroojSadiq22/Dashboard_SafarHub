'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardRedirectPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  useEffect(() => {
    if (isUserLoading || !firestore) {
      return;
    }

    if (!user) {
      router.replace('/login');
      return;
    }

    const fetchUserRole = async () => {
      try {
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const role = userData.role;

          // Check for admin role first
          const adminDocRef = doc(firestore, 'roles_admin', user.uid);
          const adminDoc = await getDoc(adminDocRef);

          if (adminDoc.exists()) {
            router.replace('/dashboard/admin');
          } else if (role === 'agent') {
            router.replace('/dashboard/agent');
          } else {
            router.replace('/dashboard/user');
          }
        } else {
          // If user doc doesn't exist, maybe they signed up with Google
          // without completing a role selection. Default to user dashboard.
          console.warn("User document not found in Firestore. Defaulting to user dashboard.");
          router.replace('/dashboard/user');
        }
      } catch (error) {
        console.error("Error fetching user role, redirecting to default:", error);
        router.replace('/dashboard/user');
      }
    };

    fetchUserRole();
  }, [user, isUserLoading, firestore, router]);

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
