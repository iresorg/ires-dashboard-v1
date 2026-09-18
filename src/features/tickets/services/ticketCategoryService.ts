import api from "@/shared/services/api";
import type { TicketCategory, TicketSubCategory } from "../types";

const skipAuthRedirect = { skipAuthRedirect: true };

const unwrapCategories = (payload: unknown): TicketCategory[] => {
  if (Array.isArray(payload)) return payload as TicketCategory[];
  if (payload && typeof payload === "object") {
    const obj = payload as { data?: unknown; categories?: unknown };
    if (Array.isArray(obj.data)) return obj.data as TicketCategory[];
    if (Array.isArray(obj.categories)) return obj.categories as TicketCategory[];
  }
  return [];
};

const unwrapCategory = (payload: unknown): TicketCategory => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as { data: TicketCategory }).data;
  }
  return payload as TicketCategory;
};

export const getTicketCategories = async (): Promise<TicketCategory[]> => {
  const response = await api.get("/ticket-categories", skipAuthRedirect);
  return unwrapCategories(response.data).map((category) => ({
    ...category,
    subCategories: category.subCategories ?? [],
  }));
};

export const createTicketCategory = async (payload: {
  name: string;
  subCategories?: string[];
}): Promise<TicketCategory> => {
  const response = await api.post("/ticket-categories", payload, skipAuthRedirect);
  return unwrapCategory(response.data);
};

export const updateTicketCategory = async (
  id: string,
  payload: { name: string }
): Promise<TicketCategory> => {
  const response = await api.patch(
    `/ticket-categories/${id}`,
    payload,
    skipAuthRedirect
  );
  return unwrapCategory(response.data);
};

export const deleteTicketCategory = async (id: string): Promise<void> => {
  await api.delete(`/ticket-categories/${id}`, skipAuthRedirect);
};

export const createSubCategory = async (
  categoryId: string,
  payload: { name: string }
): Promise<TicketSubCategory> => {
  const response = await api.post(
    `/ticket-categories/${categoryId}/sub-categories`,
    payload,
    skipAuthRedirect
  );
  if (response.data && typeof response.data === "object" && "data" in response.data) {
    return (response.data as { data: TicketSubCategory }).data;
  }
  return response.data as TicketSubCategory;
};

export const updateSubCategory = async (
  id: string,
  payload: { name: string }
): Promise<TicketSubCategory> => {
  const response = await api.patch(
    `/ticket-categories/sub-categories/${id}`,
    payload,
    skipAuthRedirect
  );
  if (response.data && typeof response.data === "object" && "data" in response.data) {
    return (response.data as { data: TicketSubCategory }).data;
  }
  return response.data as TicketSubCategory;
};

export const deleteSubCategory = async (id: string): Promise<void> => {
  await api.delete(`/ticket-categories/sub-categories/${id}`, skipAuthRedirect);
};
