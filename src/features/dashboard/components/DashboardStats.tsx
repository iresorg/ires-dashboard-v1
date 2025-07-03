import React from "react";
import StatCard from "./StatCards";
import usersIcon from "@/shared/assets/images/users.png";
import ticketsIcon from "@/shared/assets/images/tickets.png";
import agentsIcon from "@/shared/assets/images/agents.png";
import respondersIcon from "@/shared/assets/images/responders.png";
import BarChart from "@/shared/components/charts/BarChart";

const DashboardStats: React.FC = () => {

  return (
    <>
      <div className="ml-8 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="w-full max-w-[200px]">
          <StatCard
            label="Total Users"
            value={598}
            iconSrc={usersIcon}
            bgColor="bg-[#0C0E5D]"
            textColor="text-white"
            border={false}
          />
        </div>
        <div className="w-full max-w-[220px]">
          <StatCard
            label="Total Active Tickets"
            value={67}
            iconSrc={ticketsIcon}
          />
        </div>
        <div className="w-full max-w-[220px]">
          <StatCard label="Total Agents" value={30} iconSrc={agentsIcon} />
        </div>
        <div className="w-full max-w-[220px]">
          <StatCard
            label="Total Responders"
            value={55}
            iconSrc={respondersIcon}
          />
        </div>
      </div>

      <BarChart />
    </>
  );
};

export default DashboardStats;
