// src/features/responders/store/responderStore.ts
import { create } from "zustand";
import * as responderService from "../services/respondersService";
import type {
  ResponderProfile,
  RespondersResponse,
  CreateResponderData,
  UpdateResponderData,
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
  search: string;

  fetchResponders: (page?: number, limit?: number, search?: string, role?: "RESPONDER_TIER_1" | "RESPONDER_TIER_2") => Promise<void>;
  setSearch: (search: string) => void;
  createResponder: (
    data: CreateResponderData
  ) => Promise<void>;
  updateResponder: (
    id: string,
    data: UpdateResponderData
  ) => Promise<void>;
  activateResponder: (id: string) => Promise<void>;
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

export const useResponderStore = create<ResponderState>((set) => ({
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
  search: "",

  fetchResponders: async (page = 1, limit = 10, search?: string, role?: "RESPONDER_TIER_1" | "RESPONDER_TIER_2") => {
    set({ isLoading: true, error: null });
    try {
      const response: RespondersResponse = await responderService.getResponders(
        page,
        limit,
        search,
        role
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

  setSearch: (search: string) => {
    set({ search });
  },

  createResponder: async (data) => {
    try {
      const newResponder = await responderService.createResponder(data);
      set((state) => ({
        responders: [newResponder, ...state.responders],
      }));
    } catch (err) {
      set({
        error: getErrorMessage(err),
      });
    }
  },

  updateResponder: async (id, data) => {
    try {
      const updated = await responderService.updateResponder(id, data);
      set((state) => ({
        responders: state.responders.map((r) => (r.id === id ? updated : r)),
      }));
    } catch (err) {
      set({
        error: getErrorMessage(err),
      });
    }
  },

  activateResponder: async (id) => {
    try {
      await responderService.activateResponder(id);
      set((state) => ({
        responders: state.responders.map((r) =>
          r.id === id ? { ...r, status: "active" } : r
        ),
      }));
    } catch (err) {
      set({
        error: getErrorMessage(err),
      });
    }
  },

  deactivateResponder: async (id) => {
    try {
      await responderService.deactivateResponder(id);
      set((state) => ({
        responders: state.responders.map((r) =>
          r.id === id ? { ...r, status: "inactive" } : r
        ),
      }));
    } catch (err) {
      set({
        error: getErrorMessage(err),
      });
    }
  },

  deleteResponder: async (id) => {
    try {
      await responderService.deleteResponder(id);
      set((state) => ({
        responders: state.responders.filter((r) => r.id !== id),
      }));
    } catch (err) {
      set({
        error: getErrorMessage(err),
      });
    }
  },
}));
