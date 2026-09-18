import React from "react";
import StatCard from "./StatCards";
import usersIcon from "@/shared/assets/images/users.png";
import ticketsIcon from "@/shared/assets/images/tickets.png";
import agentsIcon from "@/shared/assets/images/agents.png";
import respondersIcon from "@/shared/assets/images/responders.png";
import BarChart from "@/shared/components/charts/BarChart";
import DoughnutChart from "@/shared/components/charts/DoughnutChart";
import type { AdminOverview } from "../services/overviewService";

interface DashboardStatsProps {
  overview: AdminOverview | null;
  isLoading?: boolean;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  overview,
  isLoading = false,
}) => {
  const summary = overview?.summary;

  const cards = [
    {
      label: "Total Users",
      value: summary?.totalUsers ?? 0,
      iconSrc: usersIcon,
      featured: true,
    },
    {
      label: "Active Tickets",
      value: summary?.totalActiveTickets ?? 0,
      iconSrc: ticketsIcon,
    },
    {
      label: "Agents",
      value: summary?.totalAgents ?? 0,
      iconSrc: agentsIcon,
    },
    {
      label: "Responders",
      value: summary?.totalResponders ?? 0,
      iconSrc: respondersIcon,
    },
    {
      label: "External Users",
      value: summary?.totalExternalUsers ?? 0,
      iconSrc: usersIcon,
    },
    {
      label: "Subscribers",
      value: summary?.totalSubscribers ?? 0,
      iconSrc: ticketsIcon,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {cards.map((card) => (
          <StatCard
            key={card.label}
            label={card.label}
            value={isLoading ? "—" : card.value.toLocaleString()}
            iconSrc={card.iconSrc}
            featured={card.featured}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 min-h-[320px]">
        <div className="lg:col-span-3 h-[320px]">
          <BarChart points={overview?.ticketStatusChart} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-2 h-[320px]">
          <DoughnutChart points={overview?.userRolesChart} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
