import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { formatDateTime, getApiErrorMessage } from "@/features/tickets/types";
import CopyIconButton from "@/shared/components/ui/CopyIconButton";
import RefreshIconButton from "@/shared/components/ui/RefreshIconButton";
import { useToast } from "@/shared/components/ui/useToast";
import { ROUTES } from "@/shared/constants/routes";
import { Role } from "@/shared/types/roles";
import {
  assignIncident,
  getIncident,
  getIncidentAssignees,
  linkIncidentTicket,
  updateIncident,
} from "../services/incidentService";
import {
  INCIDENT_ONGOING,
  INCIDENT_SEVERITIES,
  agentName,
  incidentIsLocked,
  toDatetimeLocalValue,
  type Incident,
  type IncidentAssignee,
  type IncidentOngoing,
  type IncidentSeverity,
} from "../types";

const formatAssigneeRole = (role: string): string => {
  if (role === Role.AGENT_ADMIN || role === "AGENT_ADMIN") return "Agent admin";
  if (role === Role.AGENT || role === "AGENT") return "Agent";
  return role;
};

const assigneeLabel = (person: IncidentAssignee): string => {
  const name = `${person.firstName} ${person.lastName}`.trim();
  const who = name || person.email;
  return `${who} · ${formatAssigneeRole(person.role)}`;
};

const IncidentDetailPage: React.FC = () => {
  const { incidentId = "" } = useParams();
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();
  const role = user?.role;
  const canManage =
    role === Role.SUPER_ADMIN || role === Role.ADMIN || role === Role.AGENT_ADMIN;

  const [incident, setIncident] = useState<Incident | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [ongoing, setOngoing] = useState("");
  const [phone, setPhone] = useState("");
  const [detectedAt, setDetectedAt] = useState("");
  const [affectedSystems, setAffectedSystems] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [agentId, setAgentId] = useState("");
  const [assignees, setAssignees] = useState<IncidentAssignee[]>([]);
  const [assigneeSearch, setAssigneeSearch] = useState("");
  const [assigneesLoading, setAssigneesLoading] = useState(false);
  const [assigneesError, setAssigneesError] = useState("");
  const [isAssigning, setIsAssigning] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [isLinking, setIsLinking] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const applyIncident = (next: Incident) => {
    setIncident(next);
    setSeverity(next.severity);
    setIncidentType(next.incidentType);
    setOngoing(next.ongoing);
    setPhone(next.phone);
    setDetectedAt(toDatetimeLocalValue(next.detectedAt));
    setAffectedSystems(next.affectedSystems || "");
    setDescription(next.description);
    setAgentId(next.assignedAgent?.id || "");
  };

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      setError("");
      try {
        const next = await getIncident(incidentId);
        if (!cancelled) applyIncident(next);
      } catch (err) {
        if (!cancelled) setError(getApiErrorMessage(err, "Incident not found"));
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    if (incidentId) void load();
    return () => {
      cancelled = true;
    };
  }, [incidentId, refreshKey]);

  useEffect(() => {
    if (!canManage) return;
    let cancelled = false;
    const timer = window.setTimeout(() => {
      void (async () => {
        setAssigneesLoading(true);
        setAssigneesError("");
        try {
          const rows = await getIncidentAssignees(assigneeSearch);
          if (cancelled) return;
          setAssignees(rows);
        } catch (err) {
          if (cancelled) return;
          setAssignees([]);
          setAssigneesError(getApiErrorMessage(err, "Could not load assignees."));
        } finally {
          if (!cancelled) setAssigneesLoading(false);
        }
      })();
    }, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [assigneeSearch, canManage, refreshKey]);

  const locked = incident ? incidentIsLocked(incident) : true;
  const canAssignToSelf = role === Role.AGENT_ADMIN && Boolean(user?.id);

  const isDirty = useMemo(() => {
    if (!incident) return false;
    const sameText = (a: string, b: string | null | undefined) =>
      a.trim() === (b ?? "").trim();
    return !(
      severity === incident.severity &&
      ongoing === incident.ongoing &&
      sameText(incidentType, incident.incidentType) &&
      sameText(phone, incident.phone) &&
      detectedAt === toDatetimeLocalValue(incident.detectedAt) &&
      sameText(affectedSystems, incident.affectedSystems) &&
      sameText(description, incident.description)
    );
  }, [
    affectedSystems,
    description,
    detectedAt,
    incident,
    incidentType,
    ongoing,
    phone,
    severity,
  ]);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!incident || locked || !isDirty) return;
    setIsSaving(true);
    try {
      const next = await updateIncident(incident.id, {
        severity,
        incidentType: incidentType.trim(),
        ongoing,
        phone: phone.trim(),
        detectedAt: detectedAt.trim() || null,
        affectedSystems: affectedSystems.trim() || null,
        description: description.trim(),
      });
      applyIncident(next);
      showSuccess("Incident updated");
    } catch (err) {
      showError(getApiErrorMessage(err, "Incident is closed"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleAssign = async (assigneeId = agentId) => {
    if (!incident || !assigneeId) return;
    setIsAssigning(true);
    try {
      const next = await assignIncident(incident.id, assigneeId);
      applyIncident(next);
      showSuccess("Incident assigned");
    } catch (err) {
      showError(getApiErrorMessage(err, "Could not send the assignment email."));
    } finally {
      setIsAssigning(false);
    }
  };

  const handleLink = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!incident || !ticketId.trim()) return;
    setIsLinking(true);
    try {
      const next = await linkIncidentTicket(incident.id, ticketId.trim());
      applyIncident(next);
      setTicketId("");
      showSuccess("Incident linked to ticket");
    } catch (err) {
      showError(getApiErrorMessage(err, "Ticket not found"));
    } finally {
      setIsLinking(false);
    }
  };

  if (isLoading) {
    return <p className="text-sm text-[var(--muted)]">Loading incident…</p>;
  }

  if (!incident) {
    return (
      <section className="ui-card p-6 space-y-3">
        <p className="text-sm text-[var(--ires-red)]">{error || "Incident not found"}</p>
        <Link to={ROUTES.INCIDENTS} className="text-sm font-medium text-[var(--heading)] underline">
          Back to incidents
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link to={ROUTES.INCIDENTS} className="text-sm text-[var(--muted)] hover:text-[var(--heading)]">
            Incidents
          </Link>
          <div className="mt-0.5 flex items-center gap-1.5">
            <h2 className="text-lg font-semibold text-[var(--heading)]">{incident.reference}</h2>
            <CopyIconButton value={incident.reference} label="Copy incident number" />
          </div>
          <p className="text-sm text-[var(--muted)]">
            {incident.status}
            {incident.ticketStatus ? ` · ticket ${incident.ticketStatus}` : ""}
          </p>
        </div>
        <RefreshIconButton
          loading={isLoading}
          label="Refresh incident"
          onClick={() => setRefreshKey((value) => value + 1)}
        />
      </div>

      <div className="ui-card p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <Field label="Name" value={incident.name} />
        <Field label="Organization" value={incident.organization} />
        <Field label="Email" value={incident.email} />
        <Field label="Agent" value={agentName(incident.assignedAgent)} />
        <div>
          <div className="text-xs font-medium text-[var(--muted)]">Ticket</div>
          {incident.ticketId ? (
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="text-[var(--heading)] break-all">{incident.ticketId}</span>
              <CopyIconButton value={incident.ticketId} label="Copy ticket number" />
            </div>
          ) : (
            <div className="text-[var(--heading)] mt-0.5">Not linked</div>
          )}
        </div>
        <Field label="Updated" value={formatDateTime(incident.updatedAt)} />
      </div>

      {incident.ticketId && (
        <Link
          to={`${ROUTES.TICKETS}/${incident.ticketId}`}
          className="inline-flex text-sm font-medium text-[var(--heading)] underline"
        >
          Open ticket {incident.ticketId}
        </Link>
      )}

      {locked ? (
        <p className="text-sm text-[var(--muted)]">Incident is closed. The report can no longer be edited.</p>
      ) : (
        <form className="ui-card p-5 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSave}>
          <label className="block">
            <span className="text-xs font-medium text-[var(--muted)]">Severity</span>
            <select className="ui-input mt-1" value={severity} onChange={(e) => setSeverity(e.target.value)}>
              {INCIDENT_SEVERITIES.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
              {!INCIDENT_SEVERITIES.includes(severity as IncidentSeverity) && severity && (
                <option value={severity}>{severity}</option>
              )}
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-medium text-[var(--muted)]">Ongoing</span>
            <select className="ui-input mt-1" value={ongoing} onChange={(e) => setOngoing(e.target.value)}>
              {INCIDENT_ONGOING.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
              {!INCIDENT_ONGOING.includes(ongoing as IncidentOngoing) && ongoing && (
                <option value={ongoing}>{ongoing}</option>
              )}
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className="text-xs font-medium text-[var(--muted)]">Incident type</span>
            <input className="ui-input mt-1" maxLength={200} value={incidentType} onChange={(e) => setIncidentType(e.target.value)} />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-[var(--muted)]">Phone</span>
            <input className="ui-input mt-1" maxLength={40} value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-[var(--muted)]">Detected at</span>
            <input
              className="ui-input mt-1"
              type="datetime-local"
              value={detectedAt}
              onChange={(e) => setDetectedAt(e.target.value)}
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-xs font-medium text-[var(--muted)]">Affected systems</span>
            <textarea className="ui-input mt-1 min-h-[72px]" maxLength={2000} value={affectedSystems} onChange={(e) => setAffectedSystems(e.target.value)} />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-xs font-medium text-[var(--muted)]">Description</span>
            <textarea className="ui-input mt-1 min-h-[120px]" maxLength={8000} value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="ui-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSaving || !isDirty}
            >
              {isSaving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      )}

      {canManage && !locked && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="ui-card p-5 space-y-3">
            <h3 className="font-semibold text-[var(--heading)]">Assign</h3>
            <p className="text-sm text-[var(--muted)]">
              Active agents and agent admins. An agent admin can take the incident themselves.
            </p>
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Search</span>
              <input
                className="ui-input mt-1"
                placeholder="Name or email"
                value={assigneeSearch}
                onChange={(e) => {
                  setAssigneeSearch(e.target.value);
                  setAgentId("");
                }}
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Assignee</span>
              <select
                className="ui-input mt-1"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                disabled={assigneesLoading}
              >
                <option value="">
                  {assigneesLoading
                    ? "Loading assignees…"
                    : assignees.length === 0
                      ? "No assignees match"
                      : "Select an assignee"}
                </option>
                {incident.assignedAgent &&
                  !assignees.some((person) => person.id === incident.assignedAgent?.id) && (
                    <option value={incident.assignedAgent.id}>
                      {agentName(incident.assignedAgent)}
                    </option>
                  )}
                {assignees.map((person) => (
                  <option key={person.id} value={person.id}>
                    {assigneeLabel(person)}
                  </option>
                ))}
              </select>
            </label>
            {assigneesError ? <p className="text-xs text-[#ef4444]">{assigneesError}</p> : null}
            {!assigneesLoading && !assigneesError && assigneeSearch.trim() && assignees.length === 0 ? (
              <p className="text-xs text-[var(--muted)]">
                No assignees match “{assigneeSearch.trim()}”.
              </p>
            ) : null}
            <div className="flex flex-wrap gap-2">
              {canAssignToSelf && user?.id && (
                <button
                  type="button"
                  className="ui-action-btn h-10 px-4"
                  disabled={isAssigning || incident.assignedAgent?.id === user.id}
                  onClick={() => void handleAssign(user.id)}
                >
                  {incident.assignedAgent?.id === user.id ? "Assigned to you" : "Assign to me"}
                </button>
              )}
              <button
                type="button"
                className="ui-btn-primary"
                disabled={!agentId || isAssigning}
                onClick={() => void handleAssign()}
              >
                {isAssigning ? "Assigning..." : "Assign"}
              </button>
            </div>
          </div>

          {!incident.ticketId && (
            <form className="ui-card p-5 space-y-3" onSubmit={handleLink}>
              <h3 className="font-semibold text-[var(--heading)]">Link a ticket</h3>
              <p className="text-sm text-[var(--muted)]">
                The ticket customer must be this incident’s account.
              </p>
              <input
                className="ui-input"
                placeholder="iRS-…"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
              />
              <button type="submit" className="ui-btn-primary" disabled={!ticketId.trim() || isLinking}>
                {isLinking ? "Linking..." : "Link ticket"}
              </button>
            </form>
          )}
        </div>
      )}
    </section>
  );
};

const Field: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <div className="text-xs font-medium text-[var(--muted)]">{label}</div>
    <div className="text-[var(--heading)] mt-0.5 break-all">{value}</div>
  </div>
);

export default IncidentDetailPage;
