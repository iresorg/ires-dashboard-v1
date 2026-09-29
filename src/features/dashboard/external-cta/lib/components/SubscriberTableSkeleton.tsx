import React from "react";

interface SubscriberTableSkeletonProps {
  showCredits?: boolean;
}

const SubscriberTableSkeleton: React.FC<SubscriberTableSkeletonProps> = ({
  showCredits = false,
}) => {
  const cols = showCredits ? 10 : 9;

  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index}>
          {Array.from({ length: cols }).map((__, cell) => (
            <td key={cell}>
              <div className="h-4 bg-[var(--secondary)] rounded animate-pulse w-24 max-w-full" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default SubscriberTableSkeleton;
