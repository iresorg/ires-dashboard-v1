export type TicketStatus =
  | "CREATED"
  | "PENDING"
  | "ANALYSING"
  | "ASSIGNED"
  | "REASSIGNED"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "CLOSED"
  | "ESCALATED";

export type TicketTier = "TIER_1" | "TIER_2";
export type TicketSeverity = "LOW" | "MEDIUM" | "HIGH";
export type EntitlementSource = "subscription" | "payg" | null;

export interface TicketCategoryRef {
  id: string;
  name: string;
  createdAt?: string;
}

export interface TicketSubCategory {
  id: string;
  name: string;
  createdAt?: string;
  categoryId?: string;
}

export interface TicketCategory {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  subCategories: TicketSubCategory[];
}

export interface TicketAccountRef {
  id: string;
  email: string;
  role?: string;
  status?: string;
  name?: string;
}

export interface TicketStaffRef {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

export interface TicketAttachment {
  id?: string;
  url: string;
  fileName?: string;
  name?: string;
  publicId?: string;
}

export interface TicketListItem {
  ticketId: string;
  title: string;
  status: TicketStatus;
  severity: TicketSeverity | null;
  tier: TicketTier | null;
  category: TicketCategoryRef | null;
  subCategory: TicketCategoryRef | null;
  createdFor: TicketAccountRef | null;
  entitlementSource?: EntitlementSource;
  createdAt: string;
  updatedAt: string;
}

export interface TicketDetail extends TicketListItem {
  type?: string;
  description?: string;
  location?: string;
  reporterName?: string;
  internalNotes?: string | null;
  contactInformation?: string | null;
  victimInformation?: string | null;
  createdBy?: TicketStaffRef | null;
  assignedResponder?: TicketStaffRef | null;
  attachments?: TicketAttachment[];
}

export interface TicketPagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
}

export interface TicketsListResponse {
  message?: string;
  data: TicketListItem[];
  pagination: TicketPagination;
}

export interface TicketDetailResponse {
  message?: string;
  data: TicketDetail;
}

export interface TicketEligibilitySubscription {
  id: string;
  planName: string;
  maxIncidents: number | null;
  usedIncidents: number;
  remainingIncidents: number | null;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
}

export interface TicketEligibility {
  eligible: boolean;
  accountId: string;
  email?: string;
  source: EntitlementSource;
  reason?: string;
  subscription?: TicketEligibilitySubscription | null;
  paygCreditsAvailable?: number;
}

export interface TicketEligibilityResponse {
  message?: string;
  data: TicketEligibility;
}

export interface LifecycleEntry {
  id?: string;
  action: string;
  performedBy?: TicketStaffRef | string | null;
  notes?: string | null;
  createdAt: string;
}

export interface LifecycleResponse {
  message?: string;
  data: LifecycleEntry[];
  pagination: TicketPagination;
}

export interface EscalationHistoryItem {
  id?: string;
  ticketId: string;
  title?: string;
  status?: TicketStatus;
  escalationReason?: string;
  escalatedAt?: string;
  createdAt?: string;
  performedBy?: TicketStaffRef | string | null;
}

export interface EscalationHistoryResponse {
  message?: string;
  data: EscalationHistoryItem[];
  pagination: TicketPagination;
}

export interface CreateTicketPayload {
  accountId: string;
  title: string;
  type: string;
  description: string;
  location: string;
  reporterName: string;
  categoryId: string;
  subCategoryId?: string;
  internalNotes?: string;
  contactInformation?: string;
  victimInformation?: string;
  attachments?: File[];
}

export interface CreateTicketResponse {
  message?: string;
  data: TicketDetail;
}

export interface AssignTicketPayload {
  assignedResponderId: string;
  tier: TicketTier;
  severity: TicketSeverity;
  notes?: string;
}

export interface NotesPayload {
  notes?: string;
}

export interface EscalatePayload {
  escalationReason: string;
}

export interface GetTicketsParams {
  page?: number;
  limit?: number;
  status?: TicketStatus | "";
}

export const TICKET_STATUSES: TicketStatus[] = [
  "CREATED",
  "PENDING",
  "ANALYSING",
  "ASSIGNED",
  "REASSIGNED",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
  "ESCALATED",
];

export const formatTicketStatus = (status: string): string =>
  status
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const formatEntitlementSource = (source?: EntitlementSource): string => {
  if (source === "payg") return "Pay as you go";
  if (source === "subscription") return "Subscription";
  return "—";
};

export const getTicketStatusBadgeClass = (status: TicketStatus | string): string => {
  switch (status) {
    case "CREATED":
    case "PENDING":
      return "bg-slate-100 text-slate-700";
    case "ANALYSING":
      return "bg-violet-50 text-violet-700";
    case "ASSIGNED":
    case "REASSIGNED":
      return "bg-sky-50 text-sky-700";
    case "IN_PROGRESS":
      return "bg-amber-50 text-amber-800";
    case "ESCALATED":
      return "bg-orange-50 text-orange-700";
    case "RESOLVED":
      return "bg-emerald-50 text-emerald-700";
    case "CLOSED":
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (typeof error === "object" && error && "response" in error) {
    const data = (error as { response?: { data?: { message?: string; reason?: string } } })
      .response?.data;
    if (data?.message) return data.message;
    if (data?.reason) return data.reason;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
};

export const formatStaffName = (
  staff?: TicketStaffRef | string | null
): string => {
  if (!staff) return "—";
  if (typeof staff === "string") return staff;
  const name = [staff.firstName, staff.lastName].filter(Boolean).join(" ");
  return name || staff.email || staff.id || "—";
};

export const formatDateTime = (value?: string | null): string => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
