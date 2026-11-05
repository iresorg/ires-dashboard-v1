import api from "@/shared/services/api";
import {
  emptyIncidentPage,
  readIncidentPage,
  type CreateIncidentPayload,
  type CreateIncidentResponse,
  type Incident,
  type IncidentAssignee,
  type IncidentAssigneesResponse,
  type IncidentListPage,
  type IncidentListResponse,
  type IncidentResponse,
} from "../types";

const skipAuthRedirect = { skipAuthRedirect: true };

export const getIncidentQueue = async (params: {
  page?: number;
  limit?: number;
  status?: string;
  assigned?: boolean;
}): Promise<{ data: Incident[]; page: IncidentListPage }> => {
  const page = params.page ?? 1;
  const query: Record<string, string> = {
    page: String(page),
    limit: String(Math.max(5, params.limit ?? 10)),
  };
  if (params.status) query.status = params.status;
  if (typeof params.assigned === "boolean") query.assigned = String(params.assigned);

  const response = await api.get<IncidentListResponse>("/incident-reports/queue", {
    ...skipAuthRedirect,
    params: query,
  });

  return {
    data: response.data?.data ?? [],
    page: readIncidentPage(response.data, page),
  };
};

export const getIncident = async (id: string): Promise<Incident> => {
  const response = await api.get<IncidentResponse>(`/incident-reports/${id}`, skipAuthRedirect);
  return response.data.incident;
};

export const updateIncident = async (
  id: string,
  payload: Partial<
    Pick<
      Incident,
      "ongoing" | "phone" | "detectedAt" | "affectedSystems" | "description" | "severity" | "incidentType"
    >
  >
): Promise<Incident> => {
  const response = await api.patch<IncidentResponse>(
    `/incident-reports/${id}`,
    payload,
    skipAuthRedirect
  );
  return response.data.incident;
};

export const getIncidentAssignees = async (
  search?: string
): Promise<IncidentAssignee[]> => {
  const response = await api.get<IncidentAssigneesResponse>(
    "/incident-reports/assignees",
    {
      ...skipAuthRedirect,
      params: search?.trim() ? { search: search.trim() } : undefined,
    }
  );
  return response.data?.data ?? [];
};

export const assignIncident = async (id: string, agentId: string): Promise<Incident> => {
  const response = await api.patch<IncidentResponse>(
    `/incident-reports/${id}/assign`,
    { agentId },
    skipAuthRedirect
  );
  return response.data.incident;
};

export const linkIncidentTicket = async (id: string, ticketId: string): Promise<Incident> => {
  const response = await api.post<IncidentResponse>(
    `/incident-reports/${id}/ticket`,
    { ticketId },
    skipAuthRedirect
  );
  return response.data.incident;
};

export const createStaffIncident = async (
  payload: CreateIncidentPayload
): Promise<CreateIncidentResponse> => {
  const response = await api.post<CreateIncidentResponse>(
    "/incident-reports/staff",
    payload,
    skipAuthRedirect
  );
  return response.data;
};

export { emptyIncidentPage };
