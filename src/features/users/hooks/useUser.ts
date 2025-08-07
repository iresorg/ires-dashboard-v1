import { useState } from 'react';
import * as userService from '../services/userService';
import type { UserProfile } from '../services/userService';

interface UseUserReturn {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  fetchUser: (userId: string) => Promise<void>;
  clearUser: () => void;
}

export const useUser = (): UseUserReturn => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async (userId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const userData = await userService.getUserById(userId);
      setUser(userData);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user';
      setError(errorMessage);
      console.error('Failed to fetch user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearUser = () => {
    setUser(null);
    setError(null);
  };

  return {
    user,
    isLoading,
    error,
    fetchUser,
    clearUser,
  };
}; 