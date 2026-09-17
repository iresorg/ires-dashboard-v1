import React, { useState } from "react";
import DashboardStats from "./DashboardStats";
import Pagination from "@/shared/components/ui/Pagination";
import { useAdminOverview } from "../hooks/useAdminOverview";
import {
  getActivityActor,
  getActivityLabel,
  getActivityTimestamp,
} from "../services/overviewService";

const DashboardPage: React.FC = () => {
  const { overview, isLoading, error, refetch } = useAdminOverview();
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 6;

  const recentActivity = overview?.recentActivity ?? [];
  const totalPages = Math.max(1, Math.ceil(recentActivity.length / activitiesPerPage));
  const currentActivities = recentActivity.slice(
    (currentPage - 1) * activitiesPerPage,
    currentPage * activitiesPerPage
  );

  return (
    <div className="flex flex-col gap-6 min-h-full">
      {error && (
        <div className="ui-card px-4 py-3 text-sm text-[var(--ires-red)] flex items-center justify-between gap-3">
          <span>Could not load overview: {error}</span>
          <button type="button" className="ui-action-btn" onClick={refetch}>
            Retry
          </button>
        </div>
      )}

      <DashboardStats overview={overview} isLoading={isLoading} />

      <section className="ui-card flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <div>
            <h3 className="text-base font-semibold text-[var(--ires-navy-blue)]">Recent activity</h3>
            <p className="text-xs text-[var(--muted)] mt-0.5">Latest operator actions across the platform</p>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="ui-table min-w-[640px]">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Activity</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-[var(--muted)]">
                    Loading activity...
                  </td>
                </tr>
              ) : currentActivities.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-[var(--muted)]">
                    No recent activity yet.
                  </td>
                </tr>
              ) : (
                currentActivities.map((item, index) => (
                  <tr key={`${getActivityActor(item)}-${index}`}>
                    <td className="font-medium">{getActivityActor(item)}</td>
                    <td>
                      <span className="ui-chip bg-[var(--cool-blue-tint)] text-[var(--ires-navy-blue)]">
                        {item.role || "—"}
                      </span>
                    </td>
                    <td>{getActivityLabel(item)}</td>
                    <td className="text-[var(--muted)]">{getActivityTimestamp(item)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4 border-t border-[var(--border)]">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
