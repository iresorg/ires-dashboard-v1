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
    {
      label: "Escalated",
      data: [58, 35, 13],
      backgroundColor: "#EF4444", // red
    },
    {
      label: "Resolved",
      data: [48, 25, 55],
      backgroundColor: "#22C55E", // green
    },
    {
      label: "In Progress",
      data: [40, 54, 42],
      backgroundColor: "#3B82F6", // blue
    },
    {
      label: "Assigned",
      data: [35, 20, 50],
      backgroundColor: "#F97316", // orange
    },
    {
      label: "Analyzing",
      data: [30, 33, 27],
      backgroundColor: "#A78BFA", // purple
    },
    {
      label: "Pending",
      data: [28, 18, 9],
      backgroundColor: "#6B7280", // gray
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: "Ticket Status Chart",
      font: {
        size: 16,
      },
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Number of Tickets",
      },
      beginAtZero: true,
      ticks: {
        stepSize: 5,
      },
    },
    x: {
      title: {
        display: true,
        text: "Months",
      },
    },
  },
};

const BarChart: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6 h-[400px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
