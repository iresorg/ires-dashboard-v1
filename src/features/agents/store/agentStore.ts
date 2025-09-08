import { create } from "zustand";
import * as agentService from "../services/agentService";
import type { AgentProfile, AgentsResponse } from "../services/agentService";

interface AgentState {
  profile: AgentProfile | null;
  agents: AgentProfile[];
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

  fetchProfile: (id: string) => Promise<void>;
  fetchAgents: (page?: number, limit?: number, search?: string) => Promise<void>;
  setSearch: (search: string) => void;
  createAgent: (
    data: Pick<AgentProfile, "firstName" | "lastName" | "email">
  ) => Promise<void>;
  updateAgent: (id: string, data: { firstName?: string; lastName?: string; email?: string; avatarFile?: File | null }) => Promise<void>;
  deactivateAgent: (id: string) => Promise<void>;
  activateAgent: (id: string) => Promise<void>;
  deleteAgent: (id: string) => Promise<void>;
  clearProfile: () => void;
  clearAgents: () => void;
}

export const useAgentStore = create<AgentState>((set) => ({
  profile: null,
  agents: [],
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

  fetchProfile: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const profile = await agentService.getAgentProfile(id);
      set({ profile, isLoading: false });
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch agent profile",
        isLoading: false,
      });
    }
  },

  fetchAgents: async (page = 1, limit = 10, search?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response: AgentsResponse = await agentService.getAgents(
        page,
        limit,
        search
      );
      const total = Number(response.total) || 0;
      const responseLimit = Number(response.limit) || 10;
      const responsePage = Number(response.page) || 1;
      const totalPages = Number(response.totalPages) || Math.ceil(total / responseLimit) || 0;
      
      set({
        agents: response.data,
        pagination: {
          total,
          limit: responseLimit,
          page: responsePage,
          totalPages,
          nextPage: response.nextPage ? Number(response.nextPage) : null,
        },
        isLoading: false,
      });
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch agents",
        isLoading: false,
      });
    }
  },

  setSearch: (search: string) => {
    set({ search });
  },

  createAgent: async (data) => {
    try {
      const newAgent = await agentService.createAgent(data);
      set((state) => ({ agents: [newAgent, ...state.agents] }));
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to create agent",
      });
    }
  },

  updateAgent: async (id, data) => {
    try {
      const updated = await agentService.updateAgent(id, data);
      set((state) => ({
        agents: state.agents.map((a) => (a.id === id ? updated : a)),
      }));
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to update agent",
      });
    }
  },

  deactivateAgent: async (id) => {
    try {
      await agentService.deactivateAgent(id);
      set((state) => ({
        agents: state.agents.map((a) =>
          a.id === id ? { ...a, status: "deactivated" } : a
        ),
      }));
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to deactivate agent",
      });
    }
  },

  activateAgent: async (id) => {
    try {
      await agentService.activateAgent(id);
      set((state) => ({
        agents: state.agents.map((a) =>
          a.id === id ? { ...a, status: "active" } : a
        ),
      }));
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to activate agent",
      });
    }
  },

  deleteAgent: async (id) => {
    try {
      await agentService.deleteAgent(id);
      set((state) => ({
        agents: state.agents.filter((a) => a.id !== id),
      }));
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to delete agent",
      });
    }
  },

  clearProfile: () => {
    set({ profile: null, error: null });
  },

  clearAgents: () => {
    set({ agents: [], error: null });
  },
}));
