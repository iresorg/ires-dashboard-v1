// Subscriber Service
import api from "@/shared/services/api";
import type {
  SubscribersResponse,
  GetSubscribersParams,
} from "../types/subscriber";

/**
 * Get all subscribers with optional filters
 * @param params - Query parameters for filtering and pagination
 * @returns Promise with paginated subscribers data
 */
export const getSubscribers = async (
  params: GetSubscribersParams = {}
): Promise<SubscribersResponse> => {
  const queryParams = new URLSearchParams();

  // Add optional query parameters
  if (params.search) {
    queryParams.append("search", params.search);
  }
  if (params.status) {
    queryParams.append("status", params.status);
  }
  if (params.planId) {
    queryParams.append("planId", params.planId);
  }
  if (params.page) {
    queryParams.append("page", params.page.toString());
  }
  if (params.limit) {
    queryParams.append("limit", params.limit.toString());
  }

  const queryString = queryParams.toString();
  const url = `/admin/subscribers${queryString ? `?${queryString}` : ""}`;

  const response = await api.get<SubscribersResponse>(url);
  return response.data;
};

