import { useCallback, useEffect, useState } from "react";
import { getEscalationHistory } from "../services/ticketService";
import type { EscalationHistoryItem, TicketPagination } from "../types";
import { getApiErrorMessage } from "../types";

export const useEscalationHistory = () => {
  const [items, setItems] = useState<EscalationHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<TicketPagination>({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    nextPage: null,
    prevPage: null,
  });

  const fetchHistory = useCallback(async (page = 1, limit = 10) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getEscalationHistory(page, limit);
      setItems(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to load escalation history"));
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory(1, 10);
  }, [fetchHistory]);

  return { items, isLoading, error, pagination, fetchHistory };
};
