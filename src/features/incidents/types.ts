export type IncidentStatus = "OPEN" | "CLOSED";
export type IncidentSeverity = "Critical" | "High" | "Medium" | "Low";
export type IncidentOngoing = "Yes" | "No" | "Not sure";

export interface IncidentAgent {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Incident {
  id: string;
  reference: string;
  accountId: string;
  status: IncidentStatus;
  severity: IncidentSeverity | string;
  incidentType: string;
  ongoing: IncidentOngoing | string;
  name: string;
  organization: string;
  phone: string;
  email: string;
  detectedAt: string | null;
  affectedSystems: string | null;
  description: string;
  assignedAgent: IncidentAgent | null;
  ticketId: string | null;
  ticketStatus: string | null;
  createdByStaffId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IncidentListPage {
  total: number;
  limit: number;
  page: number;
  totalPages: number;
  nextPage: number | null;
}

export interface IncidentListResponse {
  message?: string;
  data: Incident[];
  total: number;
  limit: number;
  page: number;
  totalPages: number;
  nextPage: number | null;
}

export interface IncidentResponse {
  message?: string;
  incident: Incident;
}

export interface CreateIncidentPayload {
  severity: IncidentSeverity;
  incidentType: string;
  ongoing: IncidentOngoing;
  name: string;
  organization?: string;
  phone: string;
  email: string;
  detectedAt?: string;
  affectedSystems?: string;
  description: string;
  confirmed: true;
}

export interface CreateIncidentResponse {
  message?: string;
  incidentReference: string;
  accountCreated: boolean;
}

export const INCIDENT_SEVERITIES: IncidentSeverity[] = ["Critical", "High", "Medium", "Low"];
export const INCIDENT_ONGOING: IncidentOngoing[] = ["Yes", "No", "Not sure"];

export const INCIDENT_SEVERITY_OPTIONS: {
  value: IncidentSeverity;
  label: string;
  hint: string;
}[] = [
  { value: "Critical", label: "Critical", hint: "Operations stopped" },
  { value: "High", label: "High", hint: "Major impact" },
  { value: "Medium", label: "Medium", hint: "Contained impact" },
  { value: "Low", label: "Low", hint: "Suspicious activity" },
];

export const INCIDENT_TYPE_OPTIONS = [
  "Ransomware",
  "Phishing or business email compromise",
  "Data breach or data leak",
  "Malware infection",
  "Account compromise",
  "Denial of service",
  "Insider threat",
  "Fraud or financial loss",
  "Website defacement",
  "Other or not sure",
] as const;

export const emptyIncidentPage = (page = 1): IncidentListPage => ({
  total: 0,
  limit: 10,
  page,
  totalPages: 0,
  nextPage: null,
});

export const readIncidentPage = (
  body: Partial<IncidentListPage> | undefined,
  page: number
): IncidentListPage => ({
  total: body?.total ?? 0,
  limit: body?.limit ?? 10,
  page: body?.page ?? page,
  totalPages: body?.totalPages ?? 0,
  nextPage: body?.nextPage ?? null,
});

export const agentName = (agent: IncidentAgent | null | undefined): string => {
  if (!agent) return "Unassigned";
  return `${agent.firstName} ${agent.lastName}`.trim() || "Assigned";
};

export const incidentIsLocked = (incident: Incident): boolean =>
  incident.status === "CLOSED" || incident.ticketStatus === "CLOSED";

/** Value for `<input type="datetime-local" />` (`yyyy-MM-ddTHH:mm`). */
export const toDatetimeLocalValue = (value: string | null | undefined): string => {
  if (!value?.trim()) return "";
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(trimmed)) {
    return trimmed.slice(0, 16);
  }
  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};
