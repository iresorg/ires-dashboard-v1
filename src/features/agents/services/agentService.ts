import api from "@shared/services/api";

export interface AgentProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: "Active" | "Inactive";
}

export interface AgentsResponse {
  data: AgentProfile[];
  total: number;
  limit: number;
  page: number;
  totalPages: number;
  nextPage: number | null;
}

export const getAgents = async (
  page = 1,
  limit = 10
): Promise<AgentsResponse> => {
  const response = await api.get(`/agents?page=${page}&limit=${limit}`);
  return response.data;
};

export const getAgentProfile = async (id: string): Promise<AgentProfile> => {
  const response = await api.get(`/agents/${id}`);
  return response.data;
};

export const createAgent = async (
  data: Omit<AgentProfile, "id" | "status">
): Promise<AgentProfile> => {
  const response = await api.post("/agents", data);
  return response.data;
};

export const updateAgent = async (
  id: string,
  data: Partial<AgentProfile>
): Promise<AgentProfile> => {
  const response = await api.put(`/agents/${id}`, data);
  return response.data;
};

export const deactivateAgent = async (id: string): Promise<void> => {
  await api.patch(`/agents/${id}/deactivate`);
};

export const deleteAgent = async (id: string): Promise<void> => {
  await api.delete(`/agents/${id}`);
};
