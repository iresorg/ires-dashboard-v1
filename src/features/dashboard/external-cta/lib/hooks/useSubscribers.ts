import { useState, useEffect, useCallback, useRef } from "react";
import { getSubscribers } from "../services/subscriberService";
import type { Subscriber, GetSubscribersParams } from "../types/subscriber";

interface UseSubscribersReturn {
  subscribers: Subscriber[];
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
  status: "active" | "expired" | "cancelled" | "past_due" | "";
  planId: string;
  setSearch: (search: string) => void;
  setStatus: (status: "active" | "expired" | "cancelled" | "past_due" | "") => void;
  setPlanId: (planId: string) => void;
  fetchSubscribers: (page?: number, limit?: number) => Promise<void>;
  refreshSubscribers: () => Promise<void>;
}

export const useSubscribers = (): UseSubscribersReturn => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
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
  const [status, setStatus] = useState<"active" | "expired" | "cancelled" | "past_due" | "">("");
  const [planId, setPlanId] = useState("");

  const hasInitialized = useRef(false);

  const fetchSubscribers = useCallback(
    async (page?: number, limit?: number) => {
      setIsLoading(true);
      setError(null);

      try {
        const params: GetSubscribersParams = {
          page: page ?? 1,
          limit: limit ?? 10,
        };

        if (search) {
          params.search = search;
        }
        if (status) {
          params.status = status;
        }
        if (planId) {
          params.planId = planId;
        }

        const response = await getSubscribers(params);

        setSubscribers(response.data);
        setPagination({
          page: response.page,
          limit: response.limit,
          total: response.total,
          totalPages: response.totalPages,
          nextPage: response.nextPage,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch subscribers";
        setError(errorMessage);
        setSubscribers([]);
      } finally {
        setIsLoading(false);
      }
    },
    [search, status, planId]
  );

  const refreshSubscribers = useCallback(() => {
    return fetchSubscribers();
  }, [fetchSubscribers]);

  // Initial fetch
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      fetchSubscribers(1, 10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  return {
    subscribers,
    isLoading,
    error,
    pagination,
    search,
    status,
    planId,
    setSearch,
    setStatus,
    setPlanId,
    fetchSubscribers,
    refreshSubscribers,
  };
};

