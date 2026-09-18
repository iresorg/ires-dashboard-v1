import React from "react";

interface PlanCardsSkeletonProps {
  count?: number;
}

const PlanCardsSkeleton: React.FC<PlanCardsSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <article key={index} className="ui-card p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2 flex-1">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-28" />
              <div className="h-5 bg-gray-200 rounded animate-pulse w-40" />
            </div>
            <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16" />
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5" />
          </div>
          <div className="mt-4 h-7 bg-gray-200 rounded animate-pulse w-28" />
          <div className="mt-2 h-3 bg-gray-200 rounded animate-pulse w-24" />
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="h-6 bg-gray-200 rounded-full animate-pulse w-24" />
            <div className="h-6 bg-gray-200 rounded-full animate-pulse w-28" />
            <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20" />
          </div>
        </article>
      ))}
    </div>
  );
};

export default PlanCardsSkeleton;
