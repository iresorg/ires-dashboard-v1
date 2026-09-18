import api from "@/shared/services/api";
import type {
  CreateSubscriptionPlanPayload,
  DeletePlanResponse,
  SubscriptionPlan,
  SubscriptionPlanListParams,
  SubscriptionPlanListResponse,
  SubscriptionPlanMutationResponse,
  UpdateSubscriptionPlanPayload,
} from "../types";

const unwrapPlans = (payload: unknown): SubscriptionPlan[] => {
  if (Array.isArray(payload)) return payload as SubscriptionPlan[];
  if (payload && typeof payload === "object" && "plans" in payload) {
    return (payload as SubscriptionPlanListResponse).plans ?? [];
  }
  if (payload && typeof payload === "object" && "data" in payload) {
    const data = (payload as { data: unknown }).data;
    if (Array.isArray(data)) return data as SubscriptionPlan[];
    if (data && typeof data === "object" && "plans" in data) {
      return (data as SubscriptionPlanListResponse).plans ?? [];
    }
  }
  return [];
};

const skipAuthRedirect = { skipAuthRedirect: true };

export const getAdminSubscriptionPlans = async (
  params: SubscriptionPlanListParams = {}
): Promise<SubscriptionPlan[]> => {
  const query: Record<string, string> = {};
  if (params.accountType) query.accountType = params.accountType;
  if (params.paymentType) query.paymentType = params.paymentType;

  const response = await api.get<SubscriptionPlanListResponse | SubscriptionPlan[]>(
    "/admin/subscription-plans",
    {
      ...skipAuthRedirect,
      params: Object.keys(query).length > 0 ? query : undefined,
    }
  );
  return unwrapPlans(response.data);
};

export const createSubscriptionPlan = async (
  payload: CreateSubscriptionPlanPayload
): Promise<SubscriptionPlanMutationResponse> => {
  const response = await api.post<SubscriptionPlanMutationResponse>(
    "/admin/subscription-plans",
    payload,
    skipAuthRedirect
  );
  return response.data;
};

export const updateSubscriptionPlan = async (
  id: string,
  payload: UpdateSubscriptionPlanPayload
): Promise<SubscriptionPlanMutationResponse> => {
  const response = await api.patch<SubscriptionPlanMutationResponse>(
    `/admin/subscription-plans/${id}`,
    payload,
    skipAuthRedirect
  );
  return response.data;
};

export const deleteSubscriptionPlan = async (
  id: string
): Promise<DeletePlanResponse> => {
  const response = await api.delete<DeletePlanResponse>(
    `/admin/subscription-plans/${id}`,
    skipAuthRedirect
  );
  return response.data;
};
