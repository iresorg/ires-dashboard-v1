import api from "@/shared/services/api";

export interface OverviewSummary {
  totalUsers: number;
  totalActiveTickets: number;
  totalAgents: number;
  totalResponders: number;
  totalExternalUsers: number;
  totalSubscribers: number;
}

export interface TicketStatusCounts {
  ESCALATED: number;
  RESOLVED: number;
  IN_PROGRESS: number;
  ASSIGNED: number;
  ANALYSING: number;
  PENDING: number;
}

export interface TicketStatusChartPoint {
  month: string;
  label: string;
  statuses: TicketStatusCounts;
}

export interface UserRoleChartPoint {
  role: string;
  label: string;
  count: number;
}

export interface RecentActivityItem {
  user?: string;
  userName?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  activity?: string;
  action?: string;
  description?: string;
  timestamp?: string;
  createdAt?: string;
}

export interface AdminOverview {
  summary: OverviewSummary;
  ticketStatusChart: TicketStatusChartPoint[];
  userRolesChart: UserRoleChartPoint[];
  recentActivity: RecentActivityItem[];
}

const isOverview = (value: unknown): value is AdminOverview => {
  return Boolean(
    value &&
      typeof value === "object" &&
      "summary" in value &&
      "ticketStatusChart" in value
  );
};

export const getAdminOverview = async (): Promise<AdminOverview> => {
  const response = await api.get<AdminOverview | { data: AdminOverview }>(
    "/admin/overview"
  );
  const payload = response.data;

  if (isOverview(payload)) {
    return payload;
  }

  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    isOverview(payload.data)
  ) {
    return payload.data;
  }

  throw new Error("Unexpected admin overview response");
};

export const getActivityActor = (item: RecentActivityItem): string => {
  if (item.user) return item.user;
  if (item.userName) return item.userName;
  if (item.name) return item.name;
  const fullName = [item.firstName, item.lastName].filter(Boolean).join(" ");
  return fullName || "Unknown user";
};

export const getActivityLabel = (item: RecentActivityItem): string => {
  return item.activity || item.action || item.description || "Activity";
};

export const getActivityTimestamp = (item: RecentActivityItem): string => {
  const value = item.timestamp || item.createdAt;
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
