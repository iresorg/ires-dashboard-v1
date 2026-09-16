import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const fetchProfile = useAuthStore((state) => state.fetchProfile);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  return { user, profile, isAuthenticated, isInitialized, login, logout, fetchProfile, initializeAuth };
};
