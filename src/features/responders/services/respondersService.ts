import api from "@shared/services/api";

export interface ResponderProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tier: "Tier1" | "Tier2";
  status: "Active" | "Inactive";
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
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
  limit = 10
): Promise<RespondersResponse> => {
  const response = await api.get<RespondersResponse>(
    `/responders?page=${page}&limit=${limit}`
  );
  return response.data;
};

// --- CREATE ---
export const createResponder = async (
  data: Omit<ResponderProfile, "id" | "status" | "createdAt" | "updatedAt">
): Promise<ResponderProfile> => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value) formData.append(key, value as string | Blob);
  });

  const response = await api.post<ResponderProfile>("/responders", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// --- UPDATE ---
export const updateResponder = async (
  id: string,
  data: Partial<ResponderProfile>
): Promise<ResponderProfile> => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value) formData.append(key, value as string | Blob);
  });

  const response = await api.put<ResponderProfile>(
    `/responders/${id}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};

// --- DEACTIVATE ---
export const deactivateResponder = async (id: string): Promise<void> => {
  await api.patch(`/responders/${id}/deactivate`);
};

// --- DELETE ---
export const deleteResponder = async (id: string): Promise<void> => {
  await api.delete(`/responders/${id}`);
};
