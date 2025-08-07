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

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await api.get<UserProfileResponse>('/users/profile');
  return response.data.data;
};

export const getUsers = async (page: number = 1, limit: number = 10): Promise<UsersResponse> => {
  const response = await api.get<UsersResponse>(`/users?page=${page}&limit=${limit}`);
  return response.data;
}; 