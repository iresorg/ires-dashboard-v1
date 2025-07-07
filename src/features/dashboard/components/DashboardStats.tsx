import React from "react";
import StatCard from "./StatCards";
import usersIcon from "@/shared/assets/images/users.png";
import ticketsIcon from "@/shared/assets/images/tickets.png";
import agentsIcon from "@/shared/assets/images/agents.png";
import respondersIcon from "@/shared/assets/images/responders.png";
import BarChart from "@/shared/components/charts/BarChart";
import DoughnutChart from "@/shared/components/charts/DoughnutChart";

const DashboardStats: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BarChart />
        </div>
        <DoughnutChart />
      </div>
    </div>
  );
};

export default DashboardStats;
