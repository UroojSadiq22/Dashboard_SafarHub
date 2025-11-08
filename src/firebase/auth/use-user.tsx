"use client";

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useAuth } from '@/firebase/provider'; // Assuming useAuth is now in provider

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
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If there's no auth instance, we can't determine the user.
    if (!auth) {
      setUser(null);
      setIsLoading(false);
      setError(new Error("Firebase Auth instance is not available."));
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

    // Initial check might resolve fast, so ensure loading is false after a short delay
    // This helps prevent a flash of "loading" on fast connections
    const timer = setTimeout(() => {
        if(isLoading) setIsLoading(false);
    }, 500);

    return () => {
        unsubscribe();
        clearTimeout(timer);
    }
  }, [auth]);

  return { user, isLoading, error };
}
