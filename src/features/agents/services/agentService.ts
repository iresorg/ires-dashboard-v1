import {
  activateUser,
  createUser,
  deleteUser,
  deactivateUser,
  getUserById,
  getUsers,
  updateUser,
  type UserProfile,
  type UsersResponse,
} from "@/features/users/services/userService";

export type AgentProfile = UserProfile;

export type AgentsResponse = UsersResponse;

export interface CreateAgentPayload {
  firstName: string;
  lastName: string;
  email: string;
  avatarFile?: File | null;
}

export interface UpdateAgentPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatarFile?: File | null;
}

export const getAgents = async (
  page = 1,
  limit = 10,
  search?: string
): Promise<AgentsResponse> => {
  return getUsers({
    page,
    limit,
    search,
    role: "AGENT",
  });
};

export const getAgentProfile = async (id: string): Promise<AgentProfile> => {
  return getUserById(id);
};

export const createAgent = async (
  data: CreateAgentPayload
): Promise<{ message: string }> => {
  return createUser({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    role: "AGENT",
    avatarFile: data.avatarFile,
  });
};

export const updateAgent = async (
  id: string,
  data: UpdateAgentPayload
): Promise<AgentProfile> => {
  const response = await updateUser(id, data);
  return response.data;
};

export const deactivateAgent = async (id: string): Promise<void> => {
  await deactivateUser(id);
};

export const activateAgent = async (id: string): Promise<void> => {
  await activateUser(id);
};

export const deleteAgent = async (id: string): Promise<void> => {
  await deleteUser(id);
};
