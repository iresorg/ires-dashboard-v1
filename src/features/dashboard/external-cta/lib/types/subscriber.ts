// Subscriber Types
export interface Subscriber {
  id: string;
  userName: string;
  email: string;
  role: "individual" | "organization";
  planSubscribedTo: string;
  amount: string;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "cancelled" | "past_due";
}

export interface SubscribersResponse {
  data: Subscriber[];
  total: number;
  limit: number;
  page: number;
  totalPages: number;
  nextPage: number | null;
}

export interface GetSubscribersParams {
  search?: string; // Search by name or email
  status?: "active" | "expired" | "cancelled" | "past_due";
  planId?: string; // UUID string
  page?: number; // starts from 1
  limit?: number; // minimum 5
}

