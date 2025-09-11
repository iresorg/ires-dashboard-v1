// src/features/responders/store/responderStore.ts
import { create } from "zustand";
import * as responderService from "../services/respondersService";
import type {
  ResponderProfile,
  RespondersResponse,
} from "../services/respondersService";
import { AxiosError } from "axios";

interface ResponderState {
  responders: ResponderProfile[];
  pagination: {
    total: number;
    limit: number;
    page: number;
    totalPages: number;
    nextPage: number | null;
  };
  isLoading: boolean;
  error: string | null;

  fetchResponders: (page?: number, limit?: number) => Promise<void>;
  createResponder: (
    data: Omit<ResponderProfile, "id" | "status" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateResponder: (
    id: string,
    data: Partial<ResponderProfile>
  ) => Promise<void>;
  deactivateResponder: (id: string) => Promise<void>;
  deleteResponder: (id: string) => Promise<void>;
}

const getErrorMessage = (err: unknown): string => {
  if (err instanceof AxiosError) {
    return err.response?.data?.message || err.message;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return "An unexpected error occurred";
};

export const useResponderStore = create<ResponderState>((set, get) => ({
  responders: [],
  pagination: {
    total: 0,
    limit: 10,
    page: 1,
    totalPages: 0,
    nextPage: null,
  },
  isLoading: false,
  error: null,

  fetchResponders: async (page = 1, limit = 10) => {
    set({ isLoading: true, error: null });
    try {
      const response: RespondersResponse = await responderService.getResponders(
        page,
        limit
      );
      set({
        responders: response.data,
        pagination: {
          total: response.total,
          limit: response.limit,
          page: response.page,
          totalPages: response.totalPages,
          nextPage: response.nextPage,
        },
        isLoading: false,
      });
    } catch (err) {
      set({
        error: getErrorMessage(err),
        isLoading: false,
      });
    }
  },

  createResponder: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newResponder = await responderService.createResponder(data);
      set({
        responders: [newResponder, ...get().responders],
        isLoading: false,
      });
    } catch (err) {
      set({
        error: getErrorMessage(err),
        isLoading: false,
      });
    }
  },

  updateResponder: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await responderService.updateResponder(id, data);
      set({
        responders: get().responders.map((r) => (r.id === id ? updated : r)),
        isLoading: false,
      });
    } catch (err) {
      set({
        error: getErrorMessage(err),
        isLoading: false,
      });
    }
  },

  deactivateResponder: async (id) => {
    try {
      await responderService.deactivateResponder(id);
      set({
        responders: get().responders.map((r) =>
          r.id === id ? { ...r, status: "Inactive" } : r
        ),
      });
    } catch (err) {
      set({
        error: getErrorMessage(err),
      });
    }
  },

  deleteResponder: async (id) => {
    try {
      await responderService.deleteResponder(id);
      set({
        responders: get().responders.filter((r) => r.id !== id),
      });
    } catch (err) {
      set({
        error: getErrorMessage(err),
      });
    }
  },
}));
