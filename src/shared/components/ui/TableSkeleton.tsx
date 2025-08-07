import React from "react";
import TableSkeletonRow from "./TableSkeletonRow";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ 
  rows = 5, 
  columns = 6, 
  className = "" 
}) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <TableSkeletonRow 
          key={index} 
          columns={columns} 
          className={className}
        />
      ))}
    </>
  );
};

export default TableSkeleton; 