"use client";

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useAuth } from '@/firebase/provider'; 

export interface UseUserResult {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * React hook to get the current authenticated user from Firebase.
 *
 * @returns {UseUserResult} An object containing the user, loading state, and error.
 */
export function useUser(): UseUserResult {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(auth?.currentUser || null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If there's no auth instance, we can't determine the user.
    if (!auth) {
      setUser(null);
      setIsLoading(false);
      // We don't set an error here because auth might not be available during SSR
      // and that's an expected condition. The provider will throw if used incorrectly.
      return;
    }

    // Set initial state based on the current user if available
    setIsLoading(true);
    setUser(auth.currentUser);

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(firebaseUser);
        setIsLoading(false);
      },
      (err) => {
        console.error("Auth state change error:", err);
        setError(err);
        setIsLoading(false);
      }
    );

    // Make sure loading state is updated even if no change event fires
    // (e.g., user is already signed out)
    if (isLoading) {
      setTimeout(() => {
          if (isLoading) setIsLoading(false);
      }, 300); // A short delay to handle fast connections
    }


    return () => {
        unsubscribe();
    }
  }, [auth]); // Dependency on `auth` instance is crucial

  return { user, isLoading, error };
}
