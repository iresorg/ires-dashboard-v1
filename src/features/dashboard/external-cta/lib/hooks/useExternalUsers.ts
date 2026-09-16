import { useState, useEffect, useCallback, useRef } from "react";
import { getExternalUsers } from "../services/externalUserService";
import type {
  ExternalUser,
  GetExternalUsersParams,
} from "../types/externalUser";

interface UseExternalUsersReturn {
  users: ExternalUser[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    nextPage: number | null;
  };
  search: string;
  role: "individual" | "organization" | "";
  emailVerified: "verified" | "not_verified" | "";
  setSearch: (search: string) => void;
  setRole: (role: "individual" | "organization" | "") => void;
  setEmailVerified: (verified: "verified" | "not_verified" | "") => void;
  fetchUsers: (page?: number, limit?: number) => Promise<void>;
  refreshUsers: () => Promise<void>;
}

export const useExternalUsers = (): UseExternalUsersReturn => {
  const [users, setUsers] = useState<ExternalUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    nextPage: null as number | null,
  });
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<"individual" | "organization" | "">("");
  const [emailVerified, setEmailVerified] = useState<
    "verified" | "not_verified" | ""
  >("");

  const hasInitialized = useRef(false);

  const fetchUsers = useCallback(
    async (page?: number, limit?: number) => {
      setIsLoading(true);
      setError(null);

      try {
        const params: GetExternalUsersParams = {
          page: page ?? 1,
          limit: limit ?? 10,
        };

        if (search) {
          params.search = search;
        }
        if (role) {
          params.role = role;
        }
        if (emailVerified) {
          params.emailVerified = emailVerified;
        }

        const response = await getExternalUsers(params);

        setUsers(response.data);
        setPagination({
          page: response.page,
          limit: response.limit,
          total: response.total,
          totalPages: response.totalPages,
          nextPage: response.nextPage,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch users";
        setError(errorMessage);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    },
    [search, role, emailVerified]
  );

  const refreshUsers = useCallback(() => {
    return fetchUsers();
  }, [fetchUsers]);

  // Initial fetch
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      fetchUsers(1, 10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  return {
    users,
    isLoading,
    error,
    pagination,
    search,
    role,
    emailVerified,
    setSearch,
    setRole,
    setEmailVerified,
    fetchUsers,
    refreshUsers,
  };
};
