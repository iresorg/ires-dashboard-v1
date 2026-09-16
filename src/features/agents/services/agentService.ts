import api from "@shared/services/api";

export interface AgentProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  avatar?: {
    url: string;
    publicId: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  lastLogin: string | null;
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
  limit = 10,
  search?: string
): Promise<AgentsResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  
  if (search && search.trim()) {
    params.append('search', search.trim());
  }
  
  const url = `/agents?${params.toString()}`;
  const response = await api.get(url);
  return response.data;
};

export const getAgentProfile = async (id: string): Promise<AgentProfile> => {
  const response = await api.get(`/agents/${id}`);
  return response.data;
};

export const createAgent = async (
  data: Pick<AgentProfile, "firstName" | "lastName" | "email">
): Promise<AgentProfile> => {
  const response = await api.post("/agents", data);
  return response.data;
};

export interface UpdateAgentPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatarFile?: File | null;
}

export const updateAgent = async (
  id: string,
  data: UpdateAgentPayload
): Promise<AgentProfile> => {
  const form = new FormData();
  if (data.firstName !== undefined) form.append('firstName', String(data.firstName));
  if (data.lastName !== undefined) form.append('lastName', String(data.lastName));
  if (data.email !== undefined) form.append('email', String(data.email));
  if (data.avatarFile) {
    form.append('avatar', data.avatarFile);
  }
  
  const response = await api.put(`/agents/${id}`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deactivateAgent = async (id: string): Promise<void> => {
  await api.patch(`/agents/${id}/deactivate`);
};

export const activateAgent = async (id: string): Promise<void> => {
  await api.patch(`/agents/${id}/activate`);
};

export const deleteAgent = async (id: string): Promise<void> => {
  await api.delete(`/agents/${id}`);
};
