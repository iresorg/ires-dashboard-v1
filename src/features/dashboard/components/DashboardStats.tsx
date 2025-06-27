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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Ticket Status Summary</h2>
        <BarChart />
      </div>
    </>
  );
};

export default DashboardStats;
