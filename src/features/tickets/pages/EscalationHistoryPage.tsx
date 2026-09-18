import React from "react";
import { Link } from "react-router-dom";
import { useEscalationHistory } from "../hooks/useEscalationHistory";
import TicketStatusBadge from "../components/TicketStatusBadge";
import TicketTableSkeleton from "../components/TicketTableSkeleton";
import Pagination from "@/shared/components/ui/Pagination";
import { ROUTES } from "@/shared/constants/routes";
import { formatDateTime, formatStaffName } from "../types";

const EscalationHistoryPage: React.FC = () => {
  const { items, isLoading, error, pagination, fetchHistory } = useEscalationHistory();

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="ui-toolbar">
        <div>
          <Link to={ROUTES.TICKETS} className="text-xs text-[var(--muted)] hover:underline">
            ← Tickets
          </Link>
          <h2 className="text-xl font-semibold text-[var(--ires-navy-blue)] mt-1">
            Escalation history
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Admin view of escalated incidents.
          </p>
        </div>
      </div>

      {error && (
        <div className="ui-card px-4 py-3 text-sm text-[var(--ires-red)] flex items-center justify-between gap-3">
          <span>{error}</span>
          <button
            type="button"
            className="ui-action-btn"
            onClick={() => fetchHistory(pagination.currentPage || 1, 10)}
          >
            Retry
          </button>
        </div>
      )}

      <div className="ui-table-wrap">
        <table className="ui-table" style={{ minWidth: "900px" }}>
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Performed by</th>
              <th>When</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TicketTableSkeleton rows={6} columns={5} />
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-[var(--muted)] text-center py-10">
                  No escalations yet.
                </td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr key={item.id || `${item.ticketId}-${index}`}>
                  <td>
                    <Link
                      to={`${ROUTES.TICKETS}/${item.ticketId}`}
                      className="font-medium text-[var(--ires-navy-blue)] hover:underline"
                    >
                      {item.ticketId}
                    </Link>
                    {item.title && (
                      <div className="text-xs text-[var(--muted)]">{item.title}</div>
                    )}
                  </td>
                  <td>
                    {item.status ? <TicketStatusBadge status={item.status} /> : "—"}
                  </td>
                  <td className="max-w-[280px]">
                    {item.escalationReason || "—"}
                  </td>
                  <td>{formatStaffName(item.performedBy)}</td>
                  <td>{formatDateTime(item.escalatedAt || item.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!isLoading && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--muted)]">
            Page {pagination.currentPage} of {pagination.totalPages}
          </p>
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(page) => fetchHistory(page, 10)}
          />
        </div>
      )}
    </div>
  );
};

export default EscalationHistoryPage;
