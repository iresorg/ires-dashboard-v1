import React, { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";
import type { TicketStatusChartPoint } from "@/features/dashboard/services/overviewService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const STATUS_SERIES = [
  { key: "ESCALATED", label: "Escalated", color: "#D10F24" },
  { key: "RESOLVED", label: "Resolved", color: "#4CAF50" },
  { key: "IN_PROGRESS", label: "In Progress", color: "#195BFF" },
  { key: "ASSIGNED", label: "Assigned", color: "#FF7043" },
  { key: "ANALYSING", label: "Analyzing", color: "#0C0E5D" },
  { key: "PENDING", label: "Pending", color: "#4A4A4A" },
] as const;

const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
      labels: { usePointStyle: true, pointStyle: "circle", boxWidth: 8 },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { precision: 0 },
      title: { display: true, text: "Number of Tickets" },
    },
    x: {
      title: { display: true, text: "Months" },
    },
  },
};

interface BarChartProps {
  points?: TicketStatusChartPoint[];
  isLoading?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({ points = [], isLoading = false }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = useMemo(
    () => ({
      labels: points.map((point) => point.label),
      datasets: STATUS_SERIES.map((series) => ({
        label: series.label,
        data: points.map((point) => point.statuses[series.key] ?? 0),
        backgroundColor: series.color,
      })),
    }),
    [points]
  );

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] p-5 rounded-xl shadow-[var(--shadow-card)] h-full overflow-hidden">
      <h2 className="text-sm font-semibold text-[var(--ires-navy-blue)] mb-4">Ticket status</h2>
      <div className="h-[calc(100%-2rem)]">
        {isLoading ? (
          <div className="h-full rounded-lg bg-[var(--cool-blue-tint)]/50 animate-pulse" />
        ) : mounted ? (
          <Bar data={data} options={options} />
        ) : null}
      </div>
    </div>
  );
};

export default BarChart;
