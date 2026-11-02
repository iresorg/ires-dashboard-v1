import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAgents } from "@/features/agents/services/agentService";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { formatDateTime, getApiErrorMessage } from "@/features/tickets/types";
import RefreshIconButton from "@/shared/components/ui/RefreshIconButton";
import { useToast } from "@/shared/components/ui/useToast";
import { ROUTES } from "@/shared/constants/routes";
import { Role } from "@/shared/types/roles";
import {
  assignIncident,
  getIncident,
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
  type IncidentOngoing,
  type IncidentSeverity,
} from "../types";

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
  const [agents, setAgents] = useState<{ id: string; label: string; email: string }[]>([]);
  const [agentSearch, setAgentSearch] = useState("");
  const [agentsLoading, setAgentsLoading] = useState(false);
  const [agentsError, setAgentsError] = useState("");
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
    const loadAgents = async () => {
      setAgentsLoading(true);
      setAgentsError("");
      try {
        const result = await getAgents(1, 100);
        if (cancelled) return;
        setAgents(
          (result.data || [])
            .filter((item) => item.role === Role.AGENT || item.role === "AGENT")
            .map((item) => {
              const name = `${item.firstName} ${item.lastName}`.trim();
              return {
                id: item.id,
                email: item.email,
                label: name ? `${name} (${item.email})` : item.email,
              };
            })
        );
      } catch (err) {
        if (cancelled) return;
        setAgents([]);
        setAgentsError(getApiErrorMessage(err, "Could not load agents."));
      } finally {
        if (!cancelled) setAgentsLoading(false);
      }
    };
    void loadAgents();
    return () => {
      cancelled = true;
    };
  }, [canManage, refreshKey]);

  const filteredAgents = useMemo(() => {
    const query = agentSearch.trim().toLowerCase();
    if (!query) return agents;
    return agents.filter((agent) => {
      const haystack = `${agent.label} ${agent.email}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [agentSearch, agents]);

  const locked = incident ? incidentIsLocked(incident) : true;

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!incident || locked) return;
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

  const handleAssign = async () => {
    if (!incident || !agentId) return;
    setIsAssigning(true);
    try {
      const next = await assignIncident(incident.id, agentId);
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
          <h2 className="text-lg font-semibold text-[var(--heading)]">{incident.reference}</h2>
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
        <Field label="Ticket" value={incident.ticketId || "Not linked"} />
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
            <button type="submit" className="ui-btn-primary" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      )}

      {canManage && !locked && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="ui-card p-5 space-y-3">
            <h3 className="font-semibold text-[var(--heading)]">Assign an agent</h3>
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Search agents</span>
              <input
                className="ui-input mt-1"
                placeholder="Name or email"
                value={agentSearch}
                onChange={(e) => {
                  setAgentSearch(e.target.value);
                  setAgentId("");
                }}
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Agent</span>
              <select
                className="ui-input mt-1"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                disabled={agentsLoading}
              >
                <option value="">
                  {agentsLoading
                    ? "Loading agents…"
                    : filteredAgents.length === 0
                      ? "No agents match"
                      : "Select an agent"}
                </option>
                {incident.assignedAgent &&
                  !filteredAgents.some((agent) => agent.id === incident.assignedAgent?.id) && (
                    <option value={incident.assignedAgent.id}>
                      {agentName(incident.assignedAgent)}
                    </option>
                  )}
                {filteredAgents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.label}
                  </option>
                ))}
              </select>
            </label>
            {agentsError ? <p className="text-xs text-[#ef4444]">{agentsError}</p> : null}
            {!agentsLoading && !agentsError && agentSearch.trim() && filteredAgents.length === 0 ? (
              <p className="text-xs text-[var(--muted)]">No agents match “{agentSearch.trim()}”.</p>
            ) : null}
            <button type="button" className="ui-btn-primary" disabled={!agentId || isAssigning} onClick={handleAssign}>
              {isAssigning ? "Assigning..." : "Assign"}
            </button>
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
    <div className="text-[var(--heading)] mt-0.5">{value}</div>
  </div>
);

export default IncidentDetailPage;
