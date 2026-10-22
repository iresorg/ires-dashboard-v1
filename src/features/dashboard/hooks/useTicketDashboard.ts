import { useCallback, useEffect, useState } from "react";
import { getTicketDashboard } from "@/features/tickets/services/ticketService";
import type {
  TicketDashboardActivity,
  TicketDashboardSummary,
  TicketPagination,
} from "@/features/tickets/types";
import { getApiErrorMessage } from "@/features/tickets/types";

const PAGE_SIZE = 10;

const emptySummary: TicketDashboardSummary = {
  ticketsSubmitted: 0,
  ticketsResolved: 0,
  inProgress: 0,
  escalated: 0,
};

const emptyPagination: TicketPagination = {
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
  nextPage: null,
  prevPage: null,
};

export const useTicketDashboard = () => {
  const [summary, setSummary] = useState<TicketDashboardSummary>(emptySummary);
  const [activities, setActivities] = useState<TicketDashboardActivity[]>([]);
  const [pagination, setPagination] = useState<TicketPagination>(emptyPagination);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async (nextPage: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getTicketDashboard(nextPage, PAGE_SIZE);
      setSummary(response.summary);
      setActivities(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to load dashboard"));
      setActivities([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard(page);
  }, [fetchDashboard, page]);

  return {
    summary,
    activities,
    pagination,
    page,
    setPage,
    isLoading,
    error,
    refetch: () => fetchDashboard(page),
  };
};
