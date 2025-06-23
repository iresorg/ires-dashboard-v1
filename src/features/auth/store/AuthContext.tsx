/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { useState, createContext } from 'react';
import type { ReactNode } from 'react';

export type UserRole = 'admin' | 'agent' | 'responder';

export interface User {
    email: string;
    name?: string;
    role: UserRole;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string, role?: UserRole) => Promise<void>;
    logout: () => void;
    register: (name: string, email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const login = async (email: string, _password: string, role: UserRole = 'admin') => {
        // TODO: Implement actual login logic with API call
        // For now, simulate successful login
        const userData: User = { 
            email, 
            role,
            name: email.split('@')[0] // Use email prefix as name for now
        };
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    const register = async (name: string, email: string, _password: string) => {
        // TODO: Implement actual registration logic
        const userData: User = { name, email, role: 'admin' };
        setUser(userData);
        setIsAuthenticated(true);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}; 