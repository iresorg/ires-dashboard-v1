import api from "@shared/services/api";

export interface ResponderProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "RESPONDER_TIER_1" | "RESPONDER_TIER_2";
  status: "active" | "inactive";
  avatar?: {
    url: string;
    publicId: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  lastLogin: string | null;
}

export interface RespondersResponse {
  data: ResponderProfile[];
  total: number;
  limit: number;
  page: number;
  totalPages: number;
  nextPage: number | null;
}

// --- GET ---
export const getResponders = async (
  page = 1,
  limit = 10,
  search?: string,
  role?: "RESPONDER_TIER_1" | "RESPONDER_TIER_2"
): Promise<RespondersResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  
  if (search && search.trim()) {
    params.append('search', search.trim());
  }
  
  if (role) {
    params.append('role', role);
  }
  
  const url = `/responders?${params.toString()}`;
  const response = await api.get<RespondersResponse>(url);
  return response.data;
};

// --- CREATE ---
export interface CreateResponderData {
  firstName: string;
  lastName: string;
  email: string;
  role: "RESPONDER_TIER_1" | "RESPONDER_TIER_2";
  avatar?: File;
}

export const createResponder = async (
  data: CreateResponderData
): Promise<ResponderProfile> => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === 'avatar' && value instanceof File) {
        formData.append(key, value);
      } else if (key !== 'avatar') {
        formData.append(key, value as string);
      }
    }
  });

  const response = await api.post<ResponderProfile>("/responders", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// --- UPDATE ---
export interface UpdateResponderData {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: "RESPONDER_TIER_1" | "RESPONDER_TIER_2";
  avatarFile?: File | null;
}

export const updateResponder = async (
  id: string,
  data: UpdateResponderData
): Promise<ResponderProfile> => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === 'avatarFile' && value instanceof File) {
        formData.append('avatar', value);
      } else if (key !== 'avatarFile') {
        formData.append(key, value as string);
      }
    }
  });

  const response = await api.put<ResponderProfile>(
    `/responders/${id}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};

// --- ACTIVATE ---
export const activateResponder = async (id: string): Promise<void> => {
  await api.patch(`/responders/${id}/activate`);
};

// --- DEACTIVATE ---
export const deactivateResponder = async (id: string): Promise<void> => {
  await api.patch(`/responders/${id}/deactivate`);
};

// --- DELETE ---
export const deleteResponder = async (id: string): Promise<void> => {
  await api.delete(`/responders/${id}`);
};
