import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

// Chart data
const data = {
  labels: ["Agent Admin", "Responder Admin"],
  datasets: [
    {
      label: "User Roles",
      data: [75, 25],
      backgroundColor: ["#EF4444", "#A78BFA"],
      borderWidth: 0,
    },
  ],
};

// Chart options
const options: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "70%",
  rotation: Math.PI,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: false, 
        boxWidth: 12,
        boxHeight: 12,
        padding: 16,
        font: {
          size: 13,
          weight: 500,
        },
        color: "#000",
      },
    },
    tooltip: {
      enabled: true,
    },
  },
};

// Component
const DoughnutChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-[420px]">
      <h2 className="text-lg font-semibold mb-4">User Roles Chart</h2>
      <div className="relative h-[240px] w-full">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;
