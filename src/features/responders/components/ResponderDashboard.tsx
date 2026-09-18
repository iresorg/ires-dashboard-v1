import React, { useState } from "react";
import Pagination from "@/shared/components/ui/Pagination";
import ColoredTicket from "@/shared/assets/images/coloredTicket.png";

interface Activity {
  id: string;
  title: string;
  status: string;
  timestamp: string;
}

const stats = [
  {
    label: "Tickets submitted",
    value: "2,371",
  },
  {
    label: "Tickets resolved",
    value: "2,048",
  },
  {
    label: "In progress",
    value: "1,134",
  },
  {
    label: "Escalated",
    value: "109",
  },
];

const recentActivities: Activity[] = [
  {
    id: "TKT-007",
    title: "Network Intrusion",
    status: "Analyzing",
    timestamp: "Updated 3 hours ago",
  },
  {
    id: "TKT-011",
    title: "Phishing Scam",
    status: "Resolved",
    timestamp: "1 day ago",
  },
  {
    id: "TKT-023",
    title: "DDOS Alert",
    status: "Pending",
    timestamp: "2025-07-11 10:45AM",
  },
  {
    id: "TKT-052",
    title: "Malware Infection",
    status: "Assigned",
    timestamp: "2025-06-19 08:30PM",
  },
  {
    id: "TKT-085",
    title: "Port Scanning",
    status: "Escalated",
    timestamp: "2025-06-12 07:10PM",
  },
  {
    id: "TKT-096",
    title: "Ransomware",
    status: "In Progress",
    timestamp: "2025-06-09 06:15AM",
  },
];

const ResponderDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 4;

  const totalPages = Math.ceil(recentActivities.length / activitiesPerPage);
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = recentActivities.slice(
    indexOfFirstActivity,
    indexOfLastActivity
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="ui-card flex items-center gap-4 px-5 py-4"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--cool-blue-tint)]">
              <img src={ColoredTicket} alt="" className="h-6" />
            </div>
            <div>
              <p className="text-xs text-[var(--muted)]">{stat.label}</p>
              <p className="text-2xl font-semibold text-[var(--ires-navy-blue)]">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <section className="ui-card">
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <h3 className="text-base font-semibold text-[var(--ires-navy-blue)]">Recent activities</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="ui-table min-w-[600px]">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {currentActivities.map((item, index) => (
                <tr key={index}>
                  <td className="font-medium">{item.id}</td>
                  <td>{item.title}</td>
                  <td>
                    <span className="ui-chip bg-[var(--cool-blue-tint)] text-[var(--ires-navy-blue)]">
                      {item.status}
                    </span>
                  </td>
                  <td className="text-[var(--muted)]">{item.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4 border-t border-[var(--border)]">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </div>
  );
};

export default ResponderDashboard;