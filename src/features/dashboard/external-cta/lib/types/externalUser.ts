// External User Types
export interface ExternalUser {
  id: string;
  name: string;
  email: string;
  role: "individual" | "organization";
  emailVerified: boolean;
  phone: string;
  joinedDate: string;
}

export interface ExternalUsersResponse {
  data: ExternalUser[];
  total: number;
  limit: number;
  page: number;
  totalPages: number;
  nextPage: number | null;
}

export interface GetExternalUsersParams {
  search?: string;
  role?: "individual" | "organization";
  emailVerified?: "verified" | "not_verified";
  joinedDateFrom?: string; // YYYY-MM-DD format
  joinedDateTo?: string; // YYYY-MM-DD format
  page?: number; // starts from 1
  limit?: number; // minimum 5
}
