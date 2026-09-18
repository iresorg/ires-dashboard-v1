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
import {
  formatMonthLabel,
  koboToNaira,
  type RevenueByMonth,
} from "../types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface RevenueChartProps {
  points: RevenueByMonth[];
  isLoading?: boolean;
  currency?: string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({
  points,
  isLoading = false,
  currency = "NGN",
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const options: ChartOptions<"bar"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: { usePointStyle: true, pointStyle: "circle", boxWidth: 8 },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const value = Number(ctx.raw ?? 0);
              return `${ctx.dataset.label}: ${new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency,
                maximumFractionDigits: 0,
              }).format(value)}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) =>
              new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency,
                maximumFractionDigits: 0,
                notation: "compact",
              }).format(Number(value)),
          },
          title: { display: true, text: "Revenue (₦)" },
        },
        x: {
          title: { display: true, text: "Month" },
        },
      },
    }),
    [currency]
  );

  const data = useMemo(
    () => ({
      labels: points.map((point) => formatMonthLabel(point.month)),
      datasets: [
        {
          label: "Subscription",
          data: points.map((point) => koboToNaira(point.subscription)),
          backgroundColor: "#0C0E5D",
          borderRadius: 4,
        },
        {
          label: "Pay as you go",
          data: points.map((point) => koboToNaira(point.payg)),
          backgroundColor: "#195BFF",
          borderRadius: 4,
        },
      ],
    }),
    [points]
  );

  return (
    <div className="ui-card p-5 h-[340px] overflow-hidden">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[var(--ires-navy-blue)]">
          Revenue by month
        </h3>
        <p className="text-xs text-[var(--muted)] mt-0.5">
          Successful charges split by subscription vs pay-as-you-go
        </p>
      </div>
      <div className="h-[calc(100%-3rem)]">
        {isLoading ? (
          <div className="h-full rounded-lg bg-[var(--cool-blue-tint)]/50 animate-pulse" />
        ) : !points.length ? (
          <div className="h-full flex items-center justify-center text-sm text-[var(--muted)]">
            No revenue in this range yet.
          </div>
        ) : mounted ? (
          <Bar data={data} options={options} />
        ) : null}
      </div>
    </div>
  );
};

export default RevenueChart;
