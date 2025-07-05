import React from "react";
import StatCard from "./StatCards";
import usersIcon from "@/shared/assets/images/users.png";
import ticketsIcon from "@/shared/assets/images/tickets.png";
import agentsIcon from "@/shared/assets/images/agents.png";
import respondersIcon from "@/shared/assets/images/responders.png";
import BarChart from "@/shared/components/charts/BarChart";
import DoughnutChart from "@/shared/components/charts/DoughnutChart";
// import ArrowLeft from "@/shared/assets/icons/ArrowLeft.svg";
// import ArrowRight from "@/shared/assets/icons/ArrowRight.svg";

// const recentActivity = [
//   {
//     user: "Guy Hawkins",
//     role: "Agent Admin",
//     activity: "Logged in",
//     timestamp: "2025-06-29 12:30pm",
//   },
//   {
//     user: "Eleanor Pena",
//     role: "Responder Admin",
//     activity: "Updated Profile",
//     timestamp: "2025-07-01 10:20am",
//   },
// ];

const DashboardStats: React.FC = () => {
  return (
    <div className="p-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Users"
          value={598}
          iconSrc={usersIcon}
          bgColor="bg-[#0C0E5D]"
          textColor="text-white"
          border={false}
        />
        <StatCard
          label="Total Active Tickets"
          value={67}
          iconSrc={ticketsIcon}
        />
        <StatCard label="Total Agents" value={30} iconSrc={agentsIcon} />
        <StatCard
          label="Total Responders"
          value={55}
          iconSrc={respondersIcon}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="col-span-2 p-4 rounded-xl shadow-sm">
         
          <BarChart />
        </div>
        <div className="p-4 rounded-xl shadow-sm">
          <DoughnutChart />
        </div>
      </div>

      {/* Recent Activity */}
     
    </div>
  );
};

export default DashboardStats;
