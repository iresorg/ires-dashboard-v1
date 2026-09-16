// External User Service
import api from "@/shared/services/api";
import type {
  ExternalUsersResponse,
  GetExternalUsersParams,
} from "../types/externalUser";

/**
 * Get all external users with optional filters
 * @param params - Query parameters for filtering and pagination
 * @returns Promise with paginated external users data
 */
export const getExternalUsers = async (
  params: GetExternalUsersParams = {}
): Promise<ExternalUsersResponse> => {
  const queryParams = new URLSearchParams();

  // Add optional query parameters
  if (params.search) {
    queryParams.append("search", params.search);
  }
  if (params.role) {
    queryParams.append("role", params.role);
  }
  if (params.emailVerified) {
    queryParams.append("emailVerified", params.emailVerified);
  }
  if (params.joinedDateFrom) {
    queryParams.append("joinedDateFrom", params.joinedDateFrom);
  }
  if (params.joinedDateTo) {
    queryParams.append("joinedDateTo", params.joinedDateTo);
  }
  if (params.page) {
    queryParams.append("page", params.page.toString());
  }
  if (params.limit) {
    queryParams.append("limit", params.limit.toString());
  }

  const queryString = queryParams.toString();
  const url = `/admin/users${queryString ? `?${queryString}` : ""}`;

  const response = await api.get<ExternalUsersResponse>(url);
  return response.data;
};
