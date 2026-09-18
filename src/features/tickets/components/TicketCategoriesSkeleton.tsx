import React from "react";

const Pulse: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
);

interface TicketCategoriesSkeletonProps {
  rows?: number;
}

const TicketCategoriesSkeleton: React.FC<TicketCategoriesSkeletonProps> = ({
  rows = 5,
}) => {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading categories">
      <div className="flex flex-wrap items-center gap-3">
        <Pulse className="h-10 w-72" />
        <Pulse className="h-10 w-24" />
        <Pulse className="h-10 w-28" />
      </div>
      <div className="ui-table-wrap">
        <table className="ui-table">
          <thead>
            <tr>
              <th className="w-10"></th>
              <th>Category</th>
              <th>Subs</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index}>
                <td>
                  <Pulse className="h-8 w-8" />
                </td>
                <td>
                  <Pulse className="h-4 w-40" />
                </td>
                <td>
                  <Pulse className="h-4 w-8" />
                </td>
                <td>
                  <div className="flex gap-2">
                    <Pulse className="h-8 w-14" />
                    <Pulse className="h-8 w-14" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketCategoriesSkeleton;
