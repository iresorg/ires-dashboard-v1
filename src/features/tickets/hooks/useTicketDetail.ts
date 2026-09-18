import { useCallback, useEffect, useState } from "react";
import {
  assignTicket,
  closeTicket,
  escalateTicket,
  getTicketById,
  getTicketLifecycle,
  reassignTicket,
  resolveTicket,
  startResponding,
  startTicketAnalysis,
} from "../services/ticketService";
import type {
  AssignTicketPayload,
  EscalatePayload,
  LifecycleEntry,
  NotesPayload,
  TicketDetail,
  TicketPagination,
} from "../types";
import { getApiErrorMessage } from "../types";

export const useTicketDetail = (ticketId?: string) => {
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [lifecycle, setLifecycle] = useState<LifecycleEntry[]>([]);
  const [lifecyclePagination, setLifecyclePagination] = useState<TicketPagination>({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    nextPage: null,
    prevPage: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isActing, setIsActing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!ticketId) return;
    setIsLoading(true);
    setError(null);
    try {
      const [detail, life] = await Promise.all([
        getTicketById(ticketId),
        getTicketLifecycle(ticketId, 1, 10),
      ]);
      setTicket(detail);
      setLifecycle(life.data);
      setLifecyclePagination(life.pagination);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to load ticket"));
      setTicket(null);
    } finally {
      setIsLoading(false);
    }
  }, [ticketId]);

  const fetchLifecyclePage = useCallback(
    async (page: number, limit = 10) => {
      if (!ticketId) return;
      const life = await getTicketLifecycle(ticketId, page, limit);
      setLifecycle(life.data);
      setLifecyclePagination(life.pagination);
    },
    [ticketId]
  );

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const runAction = async <T,>(action: () => Promise<T>) => {
    setIsActing(true);
    try {
      const result = await action();
      await fetchDetail();
      return result;
    } finally {
      setIsActing(false);
    }
  };

  return {
    ticket,
    lifecycle,
    lifecyclePagination,
    isLoading,
    isActing,
    error,
    fetchDetail,
    fetchLifecyclePage,
    startAnalysis: (payload?: NotesPayload) =>
      runAction(() => startTicketAnalysis(ticketId!, payload)),
    assign: (payload: AssignTicketPayload) =>
      runAction(() => assignTicket(ticketId!, payload)),
    startRespondingAction: (payload?: NotesPayload) =>
      runAction(() => startResponding(ticketId!, payload)),
    escalate: (payload: EscalatePayload) =>
      runAction(() => escalateTicket(ticketId!, payload)),
    reassign: (payload: AssignTicketPayload) =>
      runAction(() => reassignTicket(ticketId!, payload)),
    resolve: (payload?: NotesPayload) =>
      runAction(() => resolveTicket(ticketId!, payload)),
    close: (payload?: NotesPayload) =>
      runAction(() => closeTicket(ticketId!, payload)),
  };
};
