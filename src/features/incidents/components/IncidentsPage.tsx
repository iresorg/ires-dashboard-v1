import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getApiErrorMessage, formatDateTime } from "@/features/tickets/types";
import Dropdown from "@/shared/components/ui/Dropdown";
import Pagination from "@/shared/components/ui/Pagination";
import { useToast } from "@/shared/components/ui/useToast";
import { ROUTES } from "@/shared/constants/routes";
import { Role } from "@/shared/types/roles";
import CreateIncidentModal from "./CreateIncidentModal";
import { getIncidentQueue } from "../services/incidentService";
import {
  agentName,
  emptyIncidentPage,
  type Incident,
  type IncidentListPage,
} from "../types";

type IncidentView = "all" | "queue";

const IncidentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess } = useToast();
  const role = user?.role;
  const canManage =
    role === Role.SUPER_ADMIN || role === Role.ADMIN || role === Role.AGENT_ADMIN;
  const canView = canManage || role === Role.AGENT;

  const [view, setView] = useState<IncidentView>("queue");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [list, setList] = useState<Incident[]>([]);
  const [meta, setMeta] = useState<IncidentListPage>(emptyIncidentPage());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const load = useCallback(async () => {
    if (!canView) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const result = await getIncidentQueue({
        page,
        limit: 10,
        status: status || undefined,
        assigned: canManage && view === "queue" ? false : undefined,
      });
      setList(result.data);
      setMeta(result.page);
    } catch (err) {
      setList([]);
      setMeta(emptyIncidentPage(page));
      setError(getApiErrorMessage(err, "Could not load incidents."));
    } finally {
      setIsLoading(false);
    }
  }, [canManage, canView, page, refreshKey, status, view]);

  useEffect(() => {
    void load();
  }, [load]);

  if (!canView) {
    return (
      <section className="ui-card p-6">
        <h2 className="text-lg font-semibold text-[var(--heading)]">Incidents</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">Your role does not include the incident queue.</p>
      </section>
    );
  }

  const statusOptions = [
    { value: "", label: "All statuses" },
    { value: "OPEN", label: "Open" },
    { value: "CLOSED", label: "Closed" },
  ];

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[var(--heading)]">Incidents</h2>
          <p className="text-sm text-[var(--muted)]">
            {canManage
              ? view === "queue"
                ? "Open reports with no agent yet."
                : "All reports. Assign an agent and link a ticket from the detail page."
              : "Incidents assigned to you."}
          </p>
        </div>
        {canManage && (
          <button type="button" className="ui-btn-primary" onClick={() => setShowCreate(true)}>
            Report incident
          </button>
        )}
      </div>

      {canManage && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={view === "queue" ? "ui-btn-primary" : "ui-action-btn h-10 px-4"}
            onClick={() => {
              setView("queue");
              setPage(1);
            }}
          >
            Unassigned queue
          </button>
          <button
            type="button"
            className={view === "all" ? "ui-btn-primary" : "ui-action-btn h-10 px-4"}
            onClick={() => {
              setView("all");
              setPage(1);
            }}
          >
            All incidents
          </button>
        </div>
      )}

      <div className="w-full sm:w-64">
        <Dropdown
          options={statusOptions}
          value={status}
          onChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          placeholder="All statuses"
        />
      </div>

      {error && <p className="text-sm text-[var(--ires-red)]">{error}</p>}

      <div className="ui-table-wrap">
        <table className="ui-table" style={{ minWidth: "980px" }}>
          <thead>
            <tr>
              <th>Reference</th>
              <th>Severity</th>
              <th>Type</th>
              <th>Organization</th>
              <th>Status</th>
              <th>Agent</th>
              <th>Ticket</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center py-10 text-[var(--muted)]">Loading incidents…</td>
              </tr>
            ) : list.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-10 text-[var(--muted)]">
                  {view === "queue"
                    ? "No unassigned incidents in the queue."
                    : "No incidents for this filter."}
                </td>
              </tr>
            ) : (
              list.map((incident) => (
                <tr
                  key={incident.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`${ROUTES.INCIDENTS}/${incident.id}`)}
                >
                  <td className="font-medium">{incident.reference}</td>
                  <td>{incident.severity}</td>
                  <td className="max-w-[180px] truncate">{incident.incidentType}</td>
                  <td>
                    <div>{incident.organization || "—"}</div>
                    <div className="text-xs text-[var(--muted)]">{incident.email}</div>
                  </td>
                  <td>{incident.status}</td>
                  <td>{agentName(incident.assignedAgent)}</td>
                  <td>{incident.ticketId || "—"}</td>
                  <td>{formatDateTime(incident.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {meta.totalPages > 1 && (
        <Pagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
          onPageChange={setPage}
        />
      )}

      {showCreate && (
        <CreateIncidentModal
          onClose={() => setShowCreate(false)}
          onCreated={(result) => {
            setShowCreate(false);
            const followUp = result.accountCreated
              ? "A new account was created. The caller should open the email and sign in."
              : "This email already had an account. The incident was added to it.";
            showSuccess(
              result.message || `Incident ${result.incidentReference} received. ${followUp}`
            );
            setPage(1);
            setRefreshKey((value) => value + 1);
          }}
        />
      )}
    </section>
  );
};

export default IncidentsPage;
