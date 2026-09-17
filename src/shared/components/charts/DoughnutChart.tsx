import React, { useEffect, useMemo, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { UserRoleChartPoint } from "@/features/dashboard/services/overviewService";

ChartJS.register(ArcElement, Tooltip, Legend);

const ROLE_COLORS = ["#0C0E5D", "#D10F24", "#195BFF", "#4CAF50", "#FF7043", "#4A4A4A"];

const options: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "70%",
  rotation: Math.PI / 2,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
};

interface DoughnutChartProps {
  points?: UserRoleChartPoint[];
  isLoading?: boolean;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  points = [],
  isLoading = false,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = useMemo(
    () => ({
      labels: points.map((point) => point.label),
      datasets: [
        {
          label: "User Roles",
          data: points.map((point) => point.count),
          backgroundColor: points.map((_, index) => ROLE_COLORS[index % ROLE_COLORS.length]),
          borderWidth: 0,
        },
      ],
    }),
    [points]
  );

  const total = points.reduce((sum, point) => sum + point.count, 0);

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] p-5 rounded-xl shadow-[var(--shadow-card)] h-full flex flex-col overflow-hidden">
      <h2 className="text-sm font-semibold text-[var(--ires-navy-blue)] mb-2">User roles</h2>
      <div className="relative flex-1 min-h-[140px]">
        {isLoading ? (
          <div className="h-full rounded-lg bg-[var(--cool-blue-tint)]/50 animate-pulse" />
        ) : total === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-[var(--muted)]">
            No role data yet
          </div>
        ) : (
          mounted && <Doughnut data={data} options={options} />
        )}
      </div>
      <div className="mt-4 space-y-2">
        {points.length === 0 && !isLoading ? (
          <p className="text-xs text-[var(--muted)]">Roles will appear here as users are added.</p>
        ) : (
          points.map((point, index) => (
            <div key={point.role} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-3 h-3 rounded-sm shrink-0"
                  style={{ backgroundColor: ROLE_COLORS[index % ROLE_COLORS.length] }}
                />
                <span className="text-sm text-[var(--muted)] truncate">{point.label}</span>
              </div>
              <span className="text-sm font-medium text-[var(--ires-navy-blue)]">
                {point.count}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoughnutChart;
