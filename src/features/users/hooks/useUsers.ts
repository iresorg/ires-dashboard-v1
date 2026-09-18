import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useUserStore } from "../store/userStore";
import { useDebounce } from "@/shared/hooks";
import * as userService from "../services/userService";
import type { User } from "@/features/admin/components/EditAdminModal";
import type { UserProfile, CreateUserPayload } from "../services/userService";

interface UseUsersReturn {
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
  roleFilter: string;
  showAdd: boolean;
  showAddSuccess: boolean;
  showEditSuccess: boolean;
  submitted: {
    firstName: string;
    lastName: string;
    role: string;
  } | null;
  setSearch: (search: string) => void;
  setRoleFilter: (role: string) => void;
  setShowAdd: (show: boolean) => void;
  setShowAddSuccess: (show: boolean) => void;
  setShowEditSuccess: (show: boolean) => void;
  fetchUsers: (page?: number, limit?: number) => Promise<void>;
  getUserById: (userId: string) => Promise<UserProfile>;
  createUser: (userData: CreateUserPayload) => Promise<void>;
  editUser: (user: User) => Promise<void>;
  deactivateUser: (id: string) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  activateUser: (id: string) => Promise<void>;
  filteredUsers: UserProfile[];
}

export const useUsers = (): UseUsersReturn => {
  const users = useUserStore((state) => state.users);
  const pagination = useUserStore((state) => state.pagination);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error);
  const fetchUsersFromStore = useUserStore((state) => state.fetchUsers);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [showEditSuccess, setShowEditSuccess] = useState(false);
  const [submitted, setSubmitted] = useState<{
    firstName: string;
    lastName: string;
    role: string;
  } | null>(null);

  const debouncedSearch = useDebounce(search, 400);
  const hasInitialized = useRef(false);

  const refresh = useCallback(
    async (page = pagination.page || 1, limit = pagination.limit || 10) => {
      await fetchUsersFromStore(
        page,
        limit,
        debouncedSearch || undefined,
        roleFilter || undefined
      );
    },
    [fetchUsersFromStore, pagination.page, pagination.limit, debouncedSearch, roleFilter]
  );

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      fetchUsersFromStore(1, 10);
      return;
    }
    fetchUsersFromStore(
      1,
      pagination.limit || 10,
      debouncedSearch || undefined,
      roleFilter || undefined
    );
  }, [debouncedSearch, roleFilter, fetchUsersFromStore, pagination.limit]);

  const filteredUsers = useMemo(() => users, [users]);

  const createUser = useCallback(
    async (userData: CreateUserPayload) => {
      try {
        await userService.createUser(userData);
        setSubmitted({
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role,
        });
        setShowAdd(false);
        setShowAddSuccess(true);
        await refresh(pagination.page, pagination.limit);
      } catch (error: unknown) {
        console.error("Failed to create user:", error);
        throw error;
      }
    },
    [refresh, pagination.page, pagination.limit]
  );

  const editUser = useCallback(
    async (user: User) => {
      try {
        await userService.updateUser(user.id.toString(), {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          avatarFile: user.avatarFile,
        });
        setSubmitted({
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        });
        setShowEditSuccess(true);
        await refresh(pagination.page, pagination.limit);
      } catch (error: unknown) {
        console.error("Failed to edit user:", error);
        throw error;
      }
    },
    [refresh, pagination.page, pagination.limit]
  );

  const deactivateUser = useCallback(
    async (id: string) => {
      await userService.deactivateUser(id);
      await refresh(pagination.page, pagination.limit);
    },
    [refresh, pagination.page, pagination.limit]
  );

  const deleteUser = useCallback(
    async (id: string) => {
      await userService.deleteUser(id);
      await refresh(pagination.page, pagination.limit);
    },
    [refresh, pagination.page, pagination.limit]
  );

  const activateUser = useCallback(
    async (id: string) => {
      await userService.activateUser(id);
      await refresh(pagination.page, pagination.limit);
    },
    [refresh, pagination.page, pagination.limit]
  );

  const fetchUsers = useCallback(
    async (page?: number, limit?: number) => {
      await fetchUsersFromStore(
        page ?? 1,
        limit ?? 10,
        debouncedSearch || undefined,
        roleFilter || undefined
      );
    },
    [fetchUsersFromStore, debouncedSearch, roleFilter]
  );

  return {
    users,
    pagination,
    isLoading,
    error,
    search,
    roleFilter,
    showAdd,
    showAddSuccess,
    showEditSuccess,
    submitted,
    setSearch,
    setRoleFilter,
    setShowAdd,
    setShowAddSuccess,
    setShowEditSuccess,
    fetchUsers,
    getUserById: userService.getUserById,
    createUser,
    editUser,
    deactivateUser,
    deleteUser,
    activateUser,
    filteredUsers,
  };
};
