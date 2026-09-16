import React from "react";

interface TableSkeletonRowProps {
  columns?: number;
  className?: string;
}

const TableSkeletonRow: React.FC<TableSkeletonRowProps> = ({ 
  columns = 6, 
  className = "" 
}) => {
  return (
    <tr className={`border-t ${className}`}>
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className="px-4 py-1">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
        </td>
      ))}
    </tr>
  );
};

export default TableSkeletonRow; 