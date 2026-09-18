import { useState, useEffect, useCallback, useRef } from "react";
import { getSubscribers } from "../services/subscriberService";
import type {
  Subscriber,
  GetSubscribersParams,
  SubscriberPaymentType,
  SubscriberStatus,
} from "../types/subscriber";

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
  status: SubscriberStatus | "";
  planId: string;
  paymentType: SubscriberPaymentType | "";
  setSearch: (search: string) => void;
  setStatus: (status: SubscriberStatus | "") => void;
  setPlanId: (planId: string) => void;
  setPaymentType: (paymentType: SubscriberPaymentType | "") => void;
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
  const [status, setStatus] = useState<SubscriberStatus | "">("");
  const [planId, setPlanId] = useState("");
  const [paymentType, setPaymentType] = useState<SubscriberPaymentType | "">(
    "subscription"
  );

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
        if (paymentType) {
          params.paymentType = paymentType;
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
    [search, status, planId, paymentType]
  );

  const refreshSubscribers = useCallback(() => {
    return fetchSubscribers();
  }, [fetchSubscribers]);

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      fetchSubscribers(1, 10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    subscribers,
    isLoading,
    error,
    pagination,
    search,
    status,
    planId,
    paymentType,
    setSearch,
    setStatus,
    setPlanId,
    setPaymentType,
    fetchSubscribers,
    refreshSubscribers,
  };
};
