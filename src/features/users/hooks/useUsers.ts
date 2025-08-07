import { useState, useEffect } from 'react';
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
  deactivateUser: (id: number) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  
  // Computed
  filteredUsers: UserProfile[];
}

export const useUsers = (): UseUsersReturn => {
  const { users, pagination, isLoading, error, fetchUsers: fetchUsersFromStore } = useUserStore();
  
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

  // Initialize users on mount
  useEffect(() => {
    fetchUsersFromStore(1, 10);
  }, [fetchUsersFromStore]);

  // Filter users based on search
  const filteredUsers = users.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // User operations
  const createUser = async (userData: CreateUserPayload) => {
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
      
      // Refresh users list
      await fetchUsersFromStore(pagination.page, pagination.limit);
    } catch (error: unknown) {
      console.error('Failed to create user:', error);
      throw error;
    }
  };

  const editUser = async (user: User) => {
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
      
      // Refresh users list
      await fetchUsersFromStore(pagination.page, pagination.limit);
    } catch (error: unknown) {
      console.error('Failed to edit user:', error);
      throw error;
    }
  };

  const deactivateUser = async (id: number) => {
    try {
      const response = await userService.deactivateUser(id.toString());
      console.log('User deactivated successfully:', response);
      
      // Refresh users list
      await fetchUsersFromStore(pagination.page, pagination.limit);
    } catch (error: unknown) {
      console.error('Failed to deactivate user:', error);
      throw error;
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const response = await userService.deleteUser(id.toString());
      console.log('User deleted successfully:', response);
      
      // Refresh users list
      await fetchUsersFromStore(pagination.page, pagination.limit);
    } catch (error: unknown) {
      console.error('Failed to delete user:', error);
      throw error;
    }
  };

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
    setSearch,
    setShowAdd,
    setShowAddSuccess,
    setShowEditSuccess,
    
    // User operations
    fetchUsers: fetchUsersFromStore,
    getUserById: userService.getUserById,
    createUser,
    editUser,
    deactivateUser,
    deleteUser,
    
    // Computed
    filteredUsers,
  };
}; 