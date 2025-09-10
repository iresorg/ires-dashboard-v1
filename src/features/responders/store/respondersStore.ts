import { create } from "zustand";
import { respondersService } from "../services/respondersService";
import type { Responder } from "../services/respondersService";

interface RespondersState {
  responders: Responder[];
  loading: boolean;
  error: string | null;
  fetchResponders: () => Promise<void>;
  addResponder: (data: Omit<Responder, "id">) => Promise<void>;
  updateResponder: (id: string, data: Partial<Responder>) => Promise<void>;
  deleteResponder: (id: string) => Promise<void>;
}

const getErrorMessage = (err: unknown): string => {
  if (!err) return "An unexpected error occurred";
  if (err instanceof Error) return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
};

export const useRespondersStore = create<RespondersState>((set, get) => ({
  responders: [],
  loading: false,
  error: null,

  fetchResponders: async () => {
    set({ loading: true, error: null });
    try {
      const data = await respondersService.getResponders();
      set({ responders: data, loading: false });
    } catch (err: unknown) {
      set({ error: getErrorMessage(err), loading: false });
    }
  },

  addResponder: async (data) => {
    set({ loading: true, error: null });
    try {
      const newResponder = await respondersService.createResponder(data);
      // prepend so newest appears first; change if you prefer append
      set({ responders: [newResponder, ...get().responders], loading: false });
    } catch (err: unknown) {
      set({ error: getErrorMessage(err), loading: false });
    }
  },

  updateResponder: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const updatedResponder = await respondersService.updateResponder(
        id,
        data
      );
      set({
        responders: get().responders.map((r) =>
          r.id === id ? updatedResponder : r
        ),
        loading: false,
      });
    } catch (err: unknown) {
      set({ error: getErrorMessage(err), loading: false });
    }
  },

  deleteResponder: async (id) => {
    set({ loading: true, error: null });
    try {
      await respondersService.deleteResponder(id);
      set({
        responders: get().responders.filter((r) => r.id !== id),
        loading: false,
      });
    } catch (err: unknown) {
      set({ error: getErrorMessage(err), loading: false });
    }
  },
}));
