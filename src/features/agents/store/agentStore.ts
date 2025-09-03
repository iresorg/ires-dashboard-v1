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

  fetchProfile: (id: string) => Promise<void>;
  fetchAgents: (page?: number, limit?: number) => Promise<void>;
  createAgent: (
    data: Pick<AgentProfile, "firstName" | "lastName" | "email">
  ) => Promise<void>;
  updateAgent: (id: string, data: Partial<AgentProfile>) => Promise<void>;
  deactivateAgent: (id: string) => Promise<void>;
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

  fetchAgents: async (page = 1, limit = 10) => {
    set({ isLoading: true, error: null });
    try {
      const response: AgentsResponse = await agentService.getAgents(
        page,
        limit
      );
      set({
        agents: response.data,
        pagination: {
          total: response.total,
          limit: response.limit,
          page: response.page,
          totalPages: response.totalPages,
          nextPage: response.nextPage,
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
          a.id === id ? { ...a, status: "Inactive" } : a
        ),
      }));
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to deactivate agent",
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
