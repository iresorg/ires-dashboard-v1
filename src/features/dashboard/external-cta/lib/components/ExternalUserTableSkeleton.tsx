import React from "react";

const ExternalUserTableSkeleton: React.FC = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index}>
          {Array.from({ length: 6 }).map((__, cell) => (
            <td key={cell}>
              <div className="h-4 bg-[var(--secondary)] rounded animate-pulse w-24 max-w-full" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default ExternalUserTableSkeleton;
