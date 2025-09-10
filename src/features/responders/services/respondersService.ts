// src/services/respondersService.ts
import api from "@shared/services/api";

export interface Responder {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tier: "Tier1" | "Tier2";
  status: "Active" | "Inactive";
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const respondersService = {
  async getResponders(): Promise<Responder[]> {
    const response = await api.get("/responders");
    return response.data;
  },

  async createResponder(data: Omit<Responder, "id">): Promise<Responder> {
    const response = await api.post("/responders", data);
    return response.data;
  },

  async updateResponder(
    id: string,
    data: Partial<Responder>
  ): Promise<Responder> {
    const response = await api.put(`/responders/${id}`, data);
    return response.data;
  },

  async deleteResponder(id: string): Promise<void> {
    await api.delete(`/responders/${id}`);
  },
};
