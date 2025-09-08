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
  isLoading: boolean; // Added for loading state
  isFetchingProfile: boolean; // Flag to prevent duplicate profile fetches
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => {
  // Ref to prevent duplicate profile fetches in StrictMode
  let hasFetchedProfile = false;
  
  return {
  user: null,
  profile: null,
  isAuthenticated: false,
  isInitialized: false,
    isLoading: false, // Added for loading state
    isFetchingProfile: false, // Flag to prevent duplicate profile fetches
    
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
      hasFetchedProfile = false; // Reset flag on logout
      set({ user: null, profile: null, isAuthenticated: false, isInitialized: false, isLoading: false, isFetchingProfile: false });
    authService.logout();
  },
  fetchProfile: async () => {
      // Prevent duplicate fetches if already initialized and have profile
    if (get().isInitialized && get().profile) {
      return;
    }
      
      // If already fetching, don't fetch again
      if (get().isLoading || get().isFetchingProfile) {
        return;
      }
      
      // Prevent duplicate calls in StrictMode
      if (hasFetchedProfile) {
        return;
      }
      
      hasFetchedProfile = true;
      set({ isLoading: true, isFetchingProfile: true });
    
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
        avatar: typeof profile.avatar === 'string' ? profile.avatar : profile.avatar?.url || null
      };
        set({ profile, user, isAuthenticated: true, isInitialized: true, isLoading: false, isFetchingProfile: false });
    } catch (error: unknown) {
      console.error('Failed to fetch profile:', error);
      // If profile fetch fails, user might not be authenticated
        hasFetchedProfile = false; // Reset flag on error
        set({ user: null, profile: null, isAuthenticated: false, isInitialized: true, isLoading: false, isFetchingProfile: false });
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
          // Use fetchProfile to avoid duplicate logic
          await get().fetchProfile();
      } catch {
        // Token is invalid, clear it
        Cookies.remove('token');
          set({ user: null, profile: null, isAuthenticated: false, isInitialized: true, isLoading: false, isFetchingProfile: false });
      }
    } else {
      // No token, mark as initialized
        set({ isInitialized: true, isLoading: false, isFetchingProfile: false });
    }
  },
  };
});
