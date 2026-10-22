import { format, formatDistanceToNowStrict } from "date-fns";
import Pagination from "@/shared/components/ui/Pagination";
import ColoredTicket from "@/shared/assets/images/coloredTicket.png";
import { formatTicketStatus } from "@/features/tickets/types";
import { useTicketDashboard } from "../hooks/useTicketDashboard";

const formatActivityTimestamp = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  const diff = Date.now() - date.getTime();
  const day = 24 * 60 * 60 * 1000;
  if (diff < 0) return format(date, "yyyy-MM-dd h:mma");
  if (diff < day) {
    return `Updated ${formatDistanceToNowStrict(date)} ago`;
  }
  if (diff < 2 * day) return "1 day ago";
  return format(date, "yyyy-MM-dd h:mma");
};

const formatCount = (value: number): string =>
  Number.isFinite(value) ? value.toLocaleString("en-US") : "0";

const StaffTicketDashboard = () => {
  const { summary, activities, pagination, isLoading, error, setPage } =
    useTicketDashboard();

  const cards = [
    { label: "Tickets submitted", value: summary.ticketsSubmitted },
    { label: "Tickets resolved", value: summary.ticketsResolved },
    { label: "In progress", value: summary.inProgress },
    { label: "Escalated", value: summary.escalated },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {cards.map((stat) => (
          <div key={stat.label} className="ui-card flex items-center gap-4 px-5 py-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--cool-blue-tint)]">
              <img src={ColoredTicket} alt="" className="h-6" />
            </div>
            <div>
              <p className="text-xs text-[var(--muted)]">{stat.label}</p>
              <p className="text-2xl font-semibold text-[var(--heading)]">
                {isLoading && activities.length === 0 ? "—" : formatCount(stat.value)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <section className="ui-card">
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <h3 className="text-base font-semibold text-[var(--heading)]">Recent activities</h3>
        </div>

        {error && (
          <p className="px-5 py-4 text-sm text-[var(--ires-red)]">{error}</p>
        )}

        <div className="overflow-x-auto">
          <table className="ui-table min-w-[600px]">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && activities.length === 0 ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <tr key={index}>
                    <td colSpan={4}>
                      <div className="h-4 w-full max-w-md rounded bg-[var(--secondary)] animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : activities.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-[var(--muted)]">
                    No recent activity
                  </td>
                </tr>
              ) : (
                activities.map((item) => (
                  <tr key={item.ticketId}>
                    <td className="font-medium">{item.ticketId}</td>
                    <td>{item.title}</td>
                    <td>
                      <span className="ui-chip bg-[var(--cool-blue-tint)] text-[var(--heading)]">
                        {formatTicketStatus(item.status)}
                      </span>
                    </td>
                    <td className="text-[var(--muted)]">
                      {formatActivityTimestamp(item.updatedAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4 border-t border-[var(--border)]">
          <Pagination
            currentPage={pagination.currentPage || 1}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
            scrollToTop={false}
          />
        </div>
      </section>
    </div>
  );
};

export default StaffTicketDashboard;
