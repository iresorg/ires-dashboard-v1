import api from "@shared/services/api";

export interface UserAvatar {
  publicId?: string;
  url: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  avatar?: string | UserAvatar | null;
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

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatarFile?: File | null;
}

export interface CreateUserResponse {
  message: string;
}

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  avatarFile?: File | null;
}

export interface UpdateUserResponse {
  message: string;
  data: UserProfile;
}

export interface DeleteUserResponse {
  message: string;
}

export const getAvatarUrl = (
  avatar?: string | UserAvatar | null
): string | undefined => {
  if (!avatar) return undefined;
  if (typeof avatar === "string") return avatar;
  return avatar.url;
};

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await api.get<UserProfileResponse>("/users/profile");
  return response.data.data;
};

export const updateUserProfile = async (payload: {
  firstName?: string;
  lastName?: string;
  avatarFile?: File | null;
}): Promise<UserProfile> => {
  const form = new FormData();
  if (payload.firstName !== undefined) form.append("firstName", payload.firstName);
  if (payload.lastName !== undefined) form.append("lastName", payload.lastName);
  if (payload.avatarFile) form.append("avatar", payload.avatarFile);

  const response = await api.put<UserProfileResponse>("/users/profile", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
};

export const getUserById = async (userId: string): Promise<UserProfile> => {
  const response = await api.get<UserProfileResponse>(`/users/${userId}`);
  return response.data.data;
};

export const getUsers = async (
  pageOrParams: number | GetUsersParams = 1,
  limit = 10
): Promise<UsersResponse> => {
  const params: GetUsersParams =
    typeof pageOrParams === "number"
      ? { page: pageOrParams, limit }
      : { page: 1, limit: 10, ...pageOrParams };

  const query = new URLSearchParams();
  query.set("page", String(params.page ?? 1));
  query.set("limit", String(params.limit ?? 10));
  if (params.search?.trim()) query.set("search", params.search.trim());
  if (params.role) query.set("role", params.role);

  const response = await api.get<UsersResponse>(`/users?${query.toString()}`);
  return response.data;
};

export const createUser = async (
  userData: CreateUserPayload
): Promise<CreateUserResponse> => {
  const form = new FormData();
  form.append("firstName", userData.firstName);
  form.append("lastName", userData.lastName);
  form.append("email", userData.email);
  form.append("role", userData.role);
  if (userData.avatarFile) {
    form.append("avatar", userData.avatarFile);
  }
  const response = await api.post<CreateUserResponse>("/users", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateUser = async (
  id: string,
  userData: UpdateUserPayload
): Promise<UpdateUserResponse> => {
  const form = new FormData();
  if (userData.firstName !== undefined) form.append("firstName", String(userData.firstName));
  if (userData.lastName !== undefined) form.append("lastName", String(userData.lastName));
  if (userData.email !== undefined) form.append("email", String(userData.email));
  if (userData.role !== undefined) form.append("role", String(userData.role));
  if (userData.avatarFile) {
    form.append("avatar", userData.avatarFile);
  }
  const response = await api.put<UpdateUserResponse>(`/users/${id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deactivateUser = async (id: string): Promise<DeleteUserResponse> => {
  const response = await api.patch<DeleteUserResponse>(`/users/${id}/deactivate`);
  return response.data;
};

export const activateUser = async (id: string): Promise<DeleteUserResponse> => {
  const response = await api.patch<DeleteUserResponse>(`/users/${id}/activate`);
  return response.data;
};

export const deleteUser = async (id: string): Promise<DeleteUserResponse> => {
  const response = await api.delete<DeleteUserResponse>(`/users/${id}`);
  return response.data;
};
