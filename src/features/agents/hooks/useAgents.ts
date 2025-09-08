import { useCallback } from 'react';
import { useAgentStore } from '../store/agentStore';
import type { AgentProfile } from '../services/agentService';

interface UseAgentsReturn {
  // State
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

  // Actions
  setSearch: (search: string) => void;
  
  // Agent operations
  fetchAgents: (page?: number, limit?: number, search?: string) => Promise<void>;
  createAgent: (data: Pick<AgentProfile, "firstName" | "lastName" | "email">) => Promise<void>;
  updateAgent: (id: string, data: { firstName?: string; lastName?: string; email?: string; avatarFile?: File | null }) => Promise<void>;
  deactivateAgent: (id: string) => Promise<void>;
  activateAgent: (id: string) => Promise<void>;
  deleteAgent: (id: string) => Promise<void>;
}

export const useAgents = (): UseAgentsReturn => {
  // Use individual selectors to avoid type inference issues
  const agents = useAgentStore((state) => state.agents);
  const pagination = useAgentStore((state) => state.pagination);
  const isLoading = useAgentStore((state) => state.isLoading);
  const error = useAgentStore((state) => state.error);
  const search = useAgentStore((state) => state.search);
  const fetchAgentsFromStore = useAgentStore((state) => state.fetchAgents);
  const setSearchFromStore = useAgentStore((state) => state.setSearch);
  const createAgentFromStore = useAgentStore((state) => state.createAgent);
  const updateAgentFromStore = useAgentStore((state) => state.updateAgent);
  const deactivateAgentFromStore = useAgentStore((state) => state.deactivateAgent);
  const activateAgentFromStore = useAgentStore((state) => state.activateAgent);
  const deleteAgentFromStore = useAgentStore((state) => state.deleteAgent);
  
  // No automatic fetching - let the component handle it

  // Memoize agent operations to prevent unnecessary re-renders
  const fetchAgents = useCallback(async (page?: number, limit?: number, search?: string) => {
    await fetchAgentsFromStore(page, limit, search);
  }, [fetchAgentsFromStore]);

  const createAgent = useCallback(async (data: Pick<AgentProfile, "firstName" | "lastName" | "email">) => {
    await createAgentFromStore(data);
  }, [createAgentFromStore]);

  const updateAgent = useCallback(async (id: string, data: { firstName?: string; lastName?: string; email?: string; avatarFile?: File | null }) => {
    await updateAgentFromStore(id, data);
  }, [updateAgentFromStore]);

  const deactivateAgent = useCallback(async (id: string) => {
    await deactivateAgentFromStore(id);
  }, [deactivateAgentFromStore]);

  const activateAgent = useCallback(async (id: string) => {
    await activateAgentFromStore(id);
  }, [activateAgentFromStore]);

  const deleteAgent = useCallback(async (id: string) => {
    await deleteAgentFromStore(id);
  }, [deleteAgentFromStore]);

  return {
    // State
    agents,
    pagination,
    isLoading,
    error,
    search,

    // Actions
    setSearch: setSearchFromStore,
    
    // Agent operations
    fetchAgents,
    createAgent,
    updateAgent,
    deactivateAgent,
    activateAgent,
    deleteAgent,
  };
};
