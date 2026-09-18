import { useCallback, useEffect, useState } from "react";
import { getTickets } from "../services/ticketService";
import type { TicketListItem, TicketPagination, TicketStatus } from "../types";
import { getApiErrorMessage } from "../types";

export const useTickets = () => {
  const [tickets, setTickets] = useState<TicketListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<TicketStatus | "">("");
  const [pagination, setPagination] = useState<TicketPagination>({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    nextPage: null,
    prevPage: null,
  });

  const fetchTickets = useCallback(
    async (page = 1, limit = 10) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getTickets({
          page,
          limit,
          status: status || undefined,
        });
        setTickets(response.data);
        setPagination(response.pagination);
      } catch (err) {
        setError(getApiErrorMessage(err, "Failed to load tickets"));
        setTickets([]);
      } finally {
        setIsLoading(false);
      }
    },
    [status]
  );

  useEffect(() => {
    fetchTickets(1, 10);
  }, [fetchTickets]);

  return {
    tickets,
    isLoading,
    error,
    status,
    setStatus,
    pagination,
    fetchTickets,
  };
};
