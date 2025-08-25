import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useUserStore } from '../store/userStore';
import * as userService from '../services/userService';
import type { User } from '@/features/admin/components/EditAdminModal';
import type { UserProfile, CreateUserPayload } from '../services/userService';

interface UseUsersReturn {
  // State
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
  search: string;
  showAdd: boolean;
  showAddSuccess: boolean;
  showEditSuccess: boolean;
  submitted: {
    firstName: string;
    lastName: string;
    role: string;
  } | null;

  // Actions
  setSearch: (search: string) => void;
  setShowAdd: (show: boolean) => void;
  setShowAddSuccess: (show: boolean) => void;
  setShowEditSuccess: (show: boolean) => void;
  
  // User operations
  fetchUsers: (page?: number, limit?: number) => Promise<void>;
  getUserById: (userId: string) => Promise<UserProfile>;
  createUser: (userData: CreateUserPayload) => Promise<void>;
  editUser: (user: User) => Promise<void>;
  deactivateUser: (id: string) => Promise<void>;   
  deleteUser: (id: string) => Promise<void>; 
  activateUser: (id: string) => Promise<void>;
  
  // Computed
  filteredUsers: UserProfile[];
}

export const useUsers = (): UseUsersReturn => {
  // Use individual selectors to avoid type inference issues
  const users = useUserStore((state) => state.users);
  const pagination = useUserStore((state) => state.pagination);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error);
  const fetchUsersFromStore = useUserStore((state) => state.fetchUsers);
  
  // Store the function reference to avoid useEffect dependency issues
  const fetchUsersRef = useRef(fetchUsersFromStore);
  fetchUsersRef.current = fetchUsersFromStore;
  
  // Flag to prevent duplicate API calls in StrictMode
  const hasInitialized = useRef(false);
  
  // Local state
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [showEditSuccess, setShowEditSuccess] = useState(false);
  const [submitted, setSubmitted] = useState<{
    firstName: string;
    lastName: string;
    role: string;
  } | null>(null);

  // Initialize users on mount - only run once
  useEffect(() => {
    // Prevent duplicate calls in StrictMode and if we already have data
    if (!hasInitialized.current && users.length === 0) {
      hasInitialized.current = true;
      fetchUsersRef.current(1, 10);
    }
  }, [users.length]); // Add users.length as dependency to check if we have data

  // Memoize filtered users to prevent recalculation on every render
  const filteredUsers = useMemo(() => {
    return users.filter((u: UserProfile) =>
      `${u.firstName} ${u.lastName} ${u.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  // Memoize user operations to prevent unnecessary re-renders
  const createUser = useCallback(async (userData: CreateUserPayload) => {
    try {
      const response = await userService.createUser(userData);
      console.log('User created successfully:', response);
      
      setSubmitted({
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
      });
      setShowAdd(false);
      setShowAddSuccess(true);
      
      // Refresh users list using the store function directly
      await fetchUsersFromStore(pagination.page, pagination.limit);
    } catch (error: unknown) {
      console.error('Failed to create user:', error);
      throw error;
    }
  }, [fetchUsersFromStore, pagination.page, pagination.limit]);

  const editUser = useCallback(async (user: User) => {
    try {
      const response = await userService.updateUser(user.id.toString(), {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      });
      console.log('User updated successfully:', response);
      
      setSubmitted({
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      });
      setShowEditSuccess(true);
      
      // Refresh users list using the store function directly
      await fetchUsersFromStore(pagination.page, pagination.limit);
    } catch (error: unknown) {
      console.error('Failed to edit user:', error);
      throw error;
    }
  }, [fetchUsersFromStore, pagination.page, pagination.limit]);

  const deactivateUser = useCallback(async (id: string) => {
    try {
      console.log('Deactivating user with ID:', id, 'Type:', typeof id);
      const response = await userService.deactivateUser(id);
      console.log('User deactivated successfully:', response);
      
      // Refresh users list using the store function directly
      await fetchUsersFromStore(pagination.page, pagination.limit);
    } catch (error: unknown) {
      console.error('Failed to deactivate user:', error);
      throw error; // Re-throw to let parent component handle
    }
  }, [fetchUsersFromStore, pagination.page, pagination.limit]);

  const deleteUser = useCallback(async (id: string) => {
    try {
      console.log('Deleting user with ID:', id, 'Type:', typeof id);
      const response = await userService.deleteUser(id);
      console.log('User deleted successfully:', response);
      
      // Refresh users list using the store function directly
      await fetchUsersFromStore(pagination.page, pagination.limit);
    } catch (error: unknown) {
      console.error('Failed to delete user:', error);
      throw error; // Re-throw to let parent component handle
    }
  }, [fetchUsersFromStore, pagination.page, pagination.limit]);

  const activateUser = useCallback(async (id: string) => {
    try {
      console.log('Activating user with ID:', id, 'Type:', typeof id);
      const response = await userService.activateUser(id);
      console.log('User activated successfully:', response);
      
      // Refresh users list using the store function directly
      await fetchUsersFromStore(pagination.page, pagination.limit);
    } catch (error: unknown) {
      console.error('Failed to activate user:', error);
      throw error; // Re-throw to let parent component handle
    }
  }, [fetchUsersFromStore, pagination.page, pagination.limit]);

  // Memoize setter functions to prevent unnecessary re-renders
  const setSearchCallback = useCallback((search: string) => setSearch(search), []);
  const setShowAddCallback = useCallback((show: boolean) => setShowAdd(show), []);
  const setShowAddSuccessCallback = useCallback((show: boolean) => setShowAddSuccess(show), []);
  const setShowEditSuccessCallback = useCallback((show: boolean) => setShowEditSuccess(show), []);

  return {
    // State
    users,
    pagination,
    isLoading,
    error,
    search,
    showAdd,
    showAddSuccess,
    showEditSuccess,
    submitted,

    // Actions
    setSearch: setSearchCallback,
    setShowAdd: setShowAddCallback,
    setShowAddSuccess: setShowAddSuccessCallback,
    setShowEditSuccess: setShowEditSuccessCallback,
    
    // User operations - return the store function directly to avoid circular dependencies
    fetchUsers: fetchUsersFromStore,
    getUserById: userService.getUserById,
    createUser,
    editUser,
    deactivateUser,
    deleteUser,
    activateUser,
    
    // Computed
    filteredUsers,
  };
}; 