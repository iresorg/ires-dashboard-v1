import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Agent Admin", "Responder Admin"],
  datasets: [
    {
      label: "User Roles",
      data: [30, 70],
      backgroundColor: ["#A78BFA", "#EF4444"],
      borderWidth: 0,
    },
  ],
};

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

const DoughnutChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md min-h-[300px] flex flex-col justify-between">
      <h2 className="text-lg font-semibold mb-2">User Roles Chart</h2>
      <div className="relative h-[200px]">
        <Doughnut data={data} options={options} />
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#A78BFA]" />
          <span className="text-sm">Agent Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#EF4444]" />
          <span className="text-sm">Responder Admin</span>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
