import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["June", "July", "August"],
  datasets: [
    { label: "Escalated", data: [58, 35, 13], backgroundColor: "#EF4444" },
    { label: "Resolved", data: [48, 25, 55], backgroundColor: "#22C55E" },
    { label: "In Progress", data: [40, 54, 42], backgroundColor: "#3B82F6" },
    { label: "Assigned", data: [35, 20, 50], backgroundColor: "#F97316" },
    { label: "Analyzing", data: [30, 33, 27], backgroundColor: "#A78BFA" },
    { label: "Pending", data: [28, 18, 9], backgroundColor: "#6B7280" },
  ],
};

const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
      labels: { usePointStyle: true, pointStyle: "circle" },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: "Number of Tickets" },
    },
    x: {
      title: { display: true, text: "Months" },
    },
  },
};

const BarChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md min-h-[300px]">
      <h2 className="text-lg font-semibold mb-4">Ticket Status Chart</h2>
      <div className="h-[250px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
