import React from "react";

const Pulse: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
);

const TicketDetailSkeleton: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-5" aria-busy="true" aria-label="Loading ticket">
      <div className="ui-toolbar items-start">
        <div className="space-y-2">
          <Pulse className="h-3 w-16" />
          <Pulse className="h-7 w-40" />
          <Pulse className="h-4 w-64" />
        </div>
        <Pulse className="h-7 w-24 rounded-full" />
      </div>

      <div className="flex flex-wrap gap-2">
        <Pulse className="h-10 w-32" />
        <Pulse className="h-10 w-28" />
        <Pulse className="h-10 w-24" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <section className="ui-card p-5 xl:col-span-2 space-y-5">
          <Pulse className="h-4 w-20" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Pulse className="h-3 w-16" />
                <Pulse className="h-4 w-28" />
              </div>
            ))}
          </div>
          <div className="space-y-2 pt-2">
            <Pulse className="h-3 w-24" />
            <Pulse className="h-4 w-full" />
            <Pulse className="h-4 w-11/12 max-w-xl" />
            <Pulse className="h-4 w-72" />
          </div>
        </section>

        <section className="ui-card p-5 space-y-4">
          <Pulse className="h-4 w-24" />
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-2 border-b border-[var(--border)] pb-3 last:border-0">
              <Pulse className="h-4 w-28" />
              <Pulse className="h-3 w-40" />
              <Pulse className="h-3 w-20" />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default TicketDetailSkeleton;
