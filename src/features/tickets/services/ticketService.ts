import api from "@/shared/services/api";
import type {
  AssignTicketPayload,
  CreateTicketPayload,
  CreateTicketResponse,
  EligibleAccount,
  EligibleAccountsResponse,
  EscalatePayload,
  EscalationHistoryResponse,
  GetEligibleAccountsParams,
  GetTicketsParams,
  LifecycleResponse,
  NotesPayload,
  TicketDetail,
  TicketDetailResponse,
  TicketEligibility,
  TicketEligibilityResponse,
  TicketsListResponse,
} from "../types";
import { normalizeTicketAttachments } from "../types";

const skipAuthRedirect = { skipAuthRedirect: true };

const emptyPagination = {
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
  nextPage: null,
  prevPage: null,
};

export const getTickets = async (
  params: GetTicketsParams = {}
): Promise<TicketsListResponse> => {
  const query: Record<string, string> = {
    page: String(params.page ?? 1),
    limit: String(params.limit ?? 10),
  };
  if (params.status) query.status = params.status;

  const response = await api.get<TicketsListResponse>("/tickets", {
    ...skipAuthRedirect,
    params: query,
  });

  return {
    message: response.data?.message,
    data: response.data?.data ?? [],
    pagination: response.data?.pagination ?? emptyPagination,
  };
};

export const getTicketById = async (ticketId: string): Promise<TicketDetail> => {
  const response = await api.get<TicketDetailResponse | TicketDetail>(
    `/tickets/${ticketId}`,
    skipAuthRedirect
  );
  const raw =
    response.data && typeof response.data === "object" && "data" in response.data
      ? (response.data as TicketDetailResponse).data
      : (response.data as TicketDetail);

  return {
    ...raw,
    attachments: normalizeTicketAttachments(
      raw.attachments as Parameters<typeof normalizeTicketAttachments>[0]
    ),
  };
};

export const getTicketEligibility = async (
  accountId: string
): Promise<TicketEligibility> => {
  const response = await api.get<TicketEligibilityResponse>(
    `/tickets/eligibility/${accountId}`,
    skipAuthRedirect
  );
  if (response.data?.data) return response.data.data;
  return response.data as unknown as TicketEligibility;
};

export const getEligibleAccounts = async (
  params: GetEligibleAccountsParams = {}
): Promise<EligibleAccountsResponse> => {
  const query: Record<string, string> = {
    page: String(params.page ?? 1),
    limit: String(params.limit ?? 10),
  };
  if (params.search?.trim()) query.search = params.search.trim();
  if (params.source) query.source = params.source;

  const response = await api.get<EligibleAccountsResponse | EligibleAccount[]>(
    "/tickets/eligible-accounts",
    {
      ...skipAuthRedirect,
      params: query,
    }
  );

  if (Array.isArray(response.data)) {
    return { data: response.data, pagination: emptyPagination };
  }

  return {
    message: response.data?.message,
    data: response.data?.data ?? [],
    pagination: response.data?.pagination ?? emptyPagination,
  };
};

export const createTicket = async (
  payload: CreateTicketPayload
): Promise<CreateTicketResponse> => {
  const formData = new FormData();
  formData.append("accountId", payload.accountId);
  formData.append("title", payload.title);
  formData.append("type", payload.type);
  formData.append("description", payload.description);
  formData.append("location", payload.location);
  formData.append("reporterName", payload.reporterName);
  formData.append("categoryId", payload.categoryId);

  if (payload.subCategoryId) formData.append("subCategoryId", payload.subCategoryId);
  if (payload.internalNotes) formData.append("internalNotes", payload.internalNotes);
  if (payload.contactInformation) {
    formData.append(
      "contactInformation",
      JSON.stringify(payload.contactInformation)
    );
  }
  if (payload.victimInformation) {
    formData.append(
      "victimInformation",
      JSON.stringify(payload.victimInformation)
    );
  }
  payload.attachments?.forEach((file) => {
    formData.append("attachments", file);
  });

  const response = await api.post<CreateTicketResponse>("/tickets", formData, {
    ...skipAuthRedirect,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getTicketLifecycle = async (
  ticketId: string,
  page = 1,
  limit = 10
): Promise<LifecycleResponse> => {
  const response = await api.get<LifecycleResponse>(
    `/tickets/${ticketId}/lifecycle`,
    {
      ...skipAuthRedirect,
      params: { page, limit },
    }
  );
  return {
    message: response.data?.message,
    data: response.data?.data ?? [],
    pagination: response.data?.pagination ?? emptyPagination,
  };
};

export const getEscalationHistory = async (
  page = 1,
  limit = 10
): Promise<EscalationHistoryResponse> => {
  const response = await api.get<EscalationHistoryResponse>(
    "/tickets/escalation-history",
    {
      ...skipAuthRedirect,
      params: { page, limit },
    }
  );
  return {
    message: response.data?.message,
    data: response.data?.data ?? [],
    pagination: response.data?.pagination ?? emptyPagination,
  };
};

export const startTicketAnalysis = async (
  ticketId: string,
  payload: NotesPayload = {}
) => {
  const response = await api.patch(
    `/tickets/${ticketId}/start-analysis`,
    payload,
    skipAuthRedirect
  );
  return response.data;
};

export const assignTicket = async (
  ticketId: string,
  payload: AssignTicketPayload
) => {
  const response = await api.patch(
    `/tickets/${ticketId}/assign`,
    payload,
    skipAuthRedirect
  );
  return response.data;
};

export const startResponding = async (
  ticketId: string,
  payload: NotesPayload = {}
) => {
  const response = await api.patch(
    `/tickets/${ticketId}/start-responding`,
    payload,
    skipAuthRedirect
  );
  return response.data;
};

export const escalateTicket = async (
  ticketId: string,
  payload: EscalatePayload
) => {
  const response = await api.patch(
    `/tickets/${ticketId}/escalate`,
    payload,
    skipAuthRedirect
  );
  return response.data;
};

export const reassignTicket = async (
  ticketId: string,
  payload: AssignTicketPayload
) => {
  const response = await api.patch(
    `/tickets/${ticketId}/reAssign`,
    payload,
    skipAuthRedirect
  );
  return response.data;
};

export const resolveTicket = async (
  ticketId: string,
  payload: NotesPayload = {}
) => {
  const response = await api.patch(
    `/tickets/${ticketId}/resolve`,
    payload,
    skipAuthRedirect
  );
  return response.data;
};

export const closeTicket = async (
  ticketId: string,
  payload: NotesPayload = {}
) => {
  const response = await api.patch(
    `/tickets/${ticketId}/close`,
    payload,
    skipAuthRedirect
  );
  return response.data;
};
