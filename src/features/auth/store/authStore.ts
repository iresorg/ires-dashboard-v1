import { create } from 'zustand';
import * as authService from '../services/authService';
import * as userService from '../../users/services/userService';
import type { User } from '../services/authService';
import type { UserProfile } from '../../users/services/userService';
import Cookies from 'js-cookie';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  isInitialized: false,
  login: async (email: string, password: string) => {
    const loggedInUser = await authService.login({ email, password });
    set({ user: loggedInUser, isAuthenticated: true });
    
    // Only fetch profile if we don't already have it
    const currentProfile = get().profile;
    if (!currentProfile) {
      try {
        const profile = await userService.getUserProfile();
        set({ profile });
      } catch (error) {
        console.warn('Failed to fetch profile after login:', error);
        // Don't fail login if profile fetch fails
      }
    }
  },
  logout: () => {
    set({ user: null, profile: null, isAuthenticated: false, isInitialized: false });
    authService.logout();
  },
  fetchProfile: async () => {
    // Prevent duplicate fetches if already initialized
    if (get().isInitialized && get().profile) {
      return;
    }
    
    try {
      const profile = await userService.getUserProfile();
      // Create a user object from profile data that matches the User interface
      const user: User = {
        id: profile.id,
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        role: profile.role,
        status: profile.status,
        avatar: profile.avatar
      };
      set({ profile, user, isAuthenticated: true, isInitialized: true });
    } catch (error: unknown) {
      console.error('Failed to fetch profile:', error);
      // If profile fetch fails, user might not be authenticated
      set({ user: null, profile: null, isAuthenticated: false, isInitialized: true });
      throw error;
    }
  },
  initializeAuth: async () => {
    // Prevent multiple initializations
    if (get().isInitialized) {
      return;
    }
    
    const token = Cookies.get('token');
    if (token) {
      try {
        const profile = await userService.getUserProfile();
        const user: User = {
          id: profile.id,
          email: profile.email,
          firstName: profile.firstName,
          lastName: profile.lastName,
          role: profile.role,
          status: profile.status,
          avatar: profile.avatar
        };
        set({ profile, user, isAuthenticated: true, isInitialized: true });
      } catch {
        // Token is invalid, clear it
        Cookies.remove('token');
        set({ user: null, profile: null, isAuthenticated: false, isInitialized: true });
      }
    } else {
      // No token, mark as initialized
      set({ isInitialized: true });
    }
  },
}));
