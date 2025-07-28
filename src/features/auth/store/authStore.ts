import { create } from "zustand";
import * as authService from "../services/authService";
import type { User } from "../services/authService";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    const loggedInUser = await authService.login({ email, password });
    set({ user: loggedInUser, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    authService.logout();
  },

  register: async (name: string, email: string, password: string) => {
    const [firstName, ...rest] = name.trim().split(" ");
    const lastName = rest.join(" ") || "-"; 

    const registeredUser = await authService.register({
      firstName,
      lastName,
      email,
      password,
    });

    set({ user: registeredUser, isAuthenticated: true });
  },
}));
