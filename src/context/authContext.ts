/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, _password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, _password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
