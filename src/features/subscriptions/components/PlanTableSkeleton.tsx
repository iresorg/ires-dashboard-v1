import React from "react";

interface PlanTableSkeletonProps {
  rows?: number;
}

const PlanTableSkeleton: React.FC<PlanTableSkeletonProps> = ({ rows = 5 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <tr key={index}>
          <td>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-48" />
            </div>
          </td>
          <td>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
          </td>
          <td>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
          </td>
          <td>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-8" />
          </td>
          <td>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
          </td>
          <td>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
          </td>
          <td>
            <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16" />
          </td>
          <td>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
          </td>
          <td>
            <div className="flex items-center gap-2">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-14" />
              <div className="h-8 bg-gray-200 rounded animate-pulse w-14" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default PlanTableSkeleton;
