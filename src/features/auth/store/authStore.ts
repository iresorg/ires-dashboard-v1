import { create } from 'zustand';
import * as authService from '../services/authService';
import * as userService from '../../users/services/userService';
import type { User } from '../services/authService';
import type { UserProfile } from '../../users/services/userService';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    const loggedInUser = await authService.login({ email, password });
    set({ user: loggedInUser, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, profile: null, isAuthenticated: false });
    authService.logout();
  },
  fetchProfile: async () => {
    try {
      const profile = await userService.getUserProfile();
      set({ profile });
    } catch (error: any) {
      console.error('Failed to fetch profile:', error);
      // Don't throw error to prevent login flow from breaking
      // Profile can be fetched later if needed
    }
  },
}));
