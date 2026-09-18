import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTickets } from "../hooks/useTickets";
import { useTicketCategories } from "../hooks/useTicketCategories";
import TicketStatusBadge from "../components/TicketStatusBadge";
import CreateTicketModal from "../components/CreateTicketModal";
import Dropdown from "@/shared/components/ui/Dropdown";
import Pagination from "@/shared/components/ui/Pagination";
import { useToast } from "@/shared/components/ui/useToast";
import { ROUTES } from "@/shared/constants/routes";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Role } from "@/shared/types/roles";
import {
  formatDateTime,
  formatEntitlementSource,
  TICKET_STATUSES,
  type TicketStatus,
} from "../types";
import TicketTableSkeleton from "../components/TicketTableSkeleton";

const TicketsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tickets, isLoading, error, status, setStatus, pagination, fetchTickets } =
    useTickets();
  const { categories } = useTicketCategories();
  const { showSuccess } = useToast();
  const [showCreate, setShowCreate] = useState(false);

  const canManageCategories =
    user?.role === Role.SUPER_ADMIN || user?.role === Role.ADMIN;
  const canViewEscalations =
    user?.role === Role.SUPER_ADMIN ||
    user?.role === Role.ADMIN ||
    user?.role === Role.RESPONDER_ADMIN;

  const statusOptions = [
    { value: "", label: "All statuses" },
    ...TICKET_STATUSES.map((value) => ({
      value,
      label: value
        .toLowerCase()
        .split("_")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
    })),
  ];

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="ui-toolbar">
        <div>
          <h2 className="text-xl font-semibold text-[var(--ires-navy-blue)]">Tickets</h2>
          <p className="text-sm text-[var(--muted)]">
            Staff inbox for incidents filed on behalf of customers.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {canManageCategories && (
            <Link to={ROUTES.TICKET_CATEGORIES} className="ui-action-btn h-10 px-4 inline-flex items-center">
              Categories
            </Link>
          )}
          {canViewEscalations && (
            <Link
              to={ROUTES.TICKET_ESCALATIONS}
              className="ui-action-btn h-10 px-4 inline-flex items-center"
            >
              Escalations
            </Link>
          )}
          <button type="button" className="ui-btn-primary" onClick={() => setShowCreate(true)}>
            Create ticket
          </button>
        </div>
      </div>

      <div className="w-full sm:w-64">
        <Dropdown
          options={statusOptions}
          value={status}
          onChange={(value) => setStatus(value as TicketStatus | "")}
          placeholder="All statuses"
        />
      </div>

      {error && (
        <div className="ui-card px-4 py-3 text-sm text-[var(--ires-red)] flex items-center justify-between gap-3">
          <span>{error}</span>
          <button
            type="button"
            className="ui-action-btn"
            onClick={() => fetchTickets(pagination.currentPage || 1, 10)}
          >
            Retry
          </button>
        </div>
      )}

      <div className="ui-table-wrap">
        <table className="ui-table" style={{ minWidth: "1100px" }}>
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Customer</th>
              <th>Category</th>
              <th>Status</th>
              <th>Severity</th>
              <th>Tier</th>
              <th>Entitlement</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TicketTableSkeleton rows={6} columns={8} />
            ) : tickets.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-[var(--muted)] text-center py-10">
                  No tickets found for this filter.
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr
                  key={ticket.ticketId}
                  className="cursor-pointer"
                  onClick={() => navigate(`${ROUTES.TICKETS}/${ticket.ticketId}`)}
                >
                  <td>
                    <div className="font-medium">{ticket.ticketId}</div>
                    <div className="text-xs text-[var(--muted)] max-w-[220px] truncate">
                      {ticket.title}
                    </div>
                  </td>
                  <td>
                    <div>{ticket.createdFor?.email || "—"}</div>
                    <div className="text-xs text-[var(--muted)] capitalize">
                      {ticket.createdFor?.role || ""}
                    </div>
                  </td>
                  <td>
                    <div>{ticket.category?.name || "—"}</div>
                    <div className="text-xs text-[var(--muted)]">
                      {ticket.subCategory?.name || ""}
                    </div>
                  </td>
                  <td>
                    <TicketStatusBadge status={ticket.status} />
                  </td>
                  <td>{ticket.severity || "—"}</td>
                  <td>{ticket.tier || "—"}</td>
                  <td>{formatEntitlementSource(ticket.entitlementSource)}</td>
                  <td>{formatDateTime(ticket.updatedAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!isLoading && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--muted)]">
            Page {pagination.currentPage} of {pagination.totalPages} ·{" "}
            {pagination.totalItems} tickets
          </p>
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(page) => fetchTickets(page, 10)}
          />
        </div>
      )}

      {showCreate && (
        <CreateTicketModal
          categories={categories}
          onClose={() => setShowCreate(false)}
          onCreated={(ticketId) => {
            setShowCreate(false);
            showSuccess(
              "Ticket created",
              "Customer has been emailed and can track this in their portal."
            );
            navigate(`${ROUTES.TICKETS}/${ticketId}`);
          }}
        />
      )}
    </div>
  );
};

export default TicketsPage;
