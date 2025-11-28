import { create } from 'zustand';
import * as userService from '../services/userService';
import type { UserProfile, UsersResponse } from '../services/userService';

interface UserState {
  profile: UserProfile | null;
  users: UserProfile[];
  pagination: {
    total: number;
    limit: number;
    page: number;
    totalPages: number;
    nextPage: number | null;
  };
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  fetchUsers: (page?: number, limit?: number) => Promise<void>;
  clearProfile: () => void;
  clearUsers: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  users: [],
  pagination: {
    total: 0,
    limit: 10,
    page: 1,
    totalPages: 0,
    nextPage: null,
  },
  isLoading: true,
  error: null,
  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const profile = await userService.getUserProfile();
      set({ profile, isLoading: false });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ 
        error: error?.response?.data?.message || 'Failed to fetch profile', 
        isLoading: false 
      });
    }
  },
  fetchUsers: async (page = 1, limit = 10) => {
    set({ isLoading: true, error: null });
    try {
      const response: UsersResponse = await userService.getUsers(page, limit);
      set({ 
        users: response.data, 
        pagination: {
          total: response.total,
          limit: response.limit,
          page: response.page,
          totalPages: response.totalPages,
          nextPage: response.nextPage,
        },
        isLoading: false 
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ 
        error: error?.response?.data?.message || 'Failed to fetch users', 
        isLoading: false 
      });
    }
  },
  clearProfile: () => {
    set({ profile: null, error: null });
  },
  clearUsers: () => {
    set({ users: [], error: null });
  },
})); 