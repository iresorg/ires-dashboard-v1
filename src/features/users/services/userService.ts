import api from '@shared/services/api';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string | null;
}

export interface UserProfileResponse {
  message: string;
  data: UserProfile;
}

export interface UsersResponse {
  data: UserProfile[];
  total: number;
  limit: number;
  page: number;
  totalPages: number;
  nextPage: number | null;
}

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface CreateUserResponse {
  message: string;
}

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
}

export interface UpdateUserResponse {
  message: string;
  data: UserProfile;
}

export interface DeleteUserResponse {
  message: string;
}

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await api.get<UserProfileResponse>('/users/profile');
  return response.data.data;
};

export const getUserById = async (userId: string): Promise<UserProfile> => {
  const response = await api.get<UserProfileResponse>(`/users/${userId}`);
  return response.data.data;
};

export const getUsers = async (page: number = 1, limit: number = 10): Promise<UsersResponse> => {
  const response = await api.get<UsersResponse>(`/users?page=${page}&limit=${limit}`);
  return response.data;
};

export const createUser = async (userData: CreateUserPayload): Promise<CreateUserResponse> => {
  const response = await api.post<CreateUserResponse>('/users', userData);
  return response.data;
};

export const updateUser = async (id: string, userData: UpdateUserPayload): Promise<UpdateUserResponse> => {
  const response = await api.put<UpdateUserResponse>(`/users/${id}`, userData);
  return response.data;
};

export const deactivateUser = async (id: string): Promise<DeleteUserResponse> => {
  const response = await api.patch<DeleteUserResponse>(`/users/${id}/deactivate`);
  return response.data;
};

export const deleteUser = async (id: string): Promise<DeleteUserResponse> => {
  const response = await api.delete<DeleteUserResponse>(`/users/${id}`);
  return response.data;
}; 