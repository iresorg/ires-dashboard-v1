import React from "react";

interface TicketTableSkeletonProps {
  rows?: number;
  columns?: number;
}

const TicketTableSkeleton: React.FC<TicketTableSkeletonProps> = ({
  rows = 6,
  columns = 8,
}) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, row) => (
        <tr key={row}>
          {Array.from({ length: columns }).map((__, col) => (
            <td key={col}>
              {col === 0 ? (
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-28" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-40" />
                </div>
              ) : col === 3 ? (
                <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20" />
              ) : (
                <div
                  className={`h-4 bg-gray-200 rounded animate-pulse ${
                    col % 2 === 0 ? "w-24" : "w-16"
                  }`}
                />
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TicketTableSkeleton;
