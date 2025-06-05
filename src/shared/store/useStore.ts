import { create } from "zustand";
import type { User } from "@/shared/types";

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  theme: "light",
  setTheme: (theme) => set({ theme }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useStore;
