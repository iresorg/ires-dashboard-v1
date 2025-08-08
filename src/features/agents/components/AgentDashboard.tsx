import React from "react";
import ArrowLeft from "@/shared/assets/icons/arrowleft.svg";
import ArrowRight from "@/shared/assets/icons/arrowright.svg";
import TicketIcon from "@/shared/assets/images/ticket.png";
import TimeIcon from "@/shared/assets/icons/time-icon.svg";
import ColoredTicket from "@/shared/assets/images/coloredTicket.png";

const stats = [
  {
    label: "Total Tickets Submitted",
    value: "2371",
    color: "bg-gray-300",
    textColor: "text-gray-800",
  },
  {
    label: "Total Tickets Resolved",
    value: "2048",
    color: "bg-green-200",
    textColor: "text-green-800",
  },
  {
    label: "Tickets In Progress",
    value: "1134",
    color: "bg-blue-200",
    textColor: "text-blue-800",
  },
  {
    label: "Tickets Escalated",
    value: "0109",
    color: "bg-red-200",
    textColor: "text-red-800",
  },
];

const recentActivities = [
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

const AgentDashboard: React.FC = () => {
  return (
    <div className="flex flex-col space-y-8 h-full overflow-hidden">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex flex-col items-start justify-center p-4 rounded-lg shadow-sm ${stat.color}`}
          >
            <img src={ColoredTicket} alt="Ticket Icon" className="h-12 mb-2" />
            <p className={`text-2xl font-bold ${stat.textColor}`}>
              {stat.value}
            </p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="flex flex-col flex-1 overflow-hidden p-6">
        <h3 className="text-lg font-bold mb-4 text-black">Recent Activities</h3>

        {/* Table*/}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left min-w-[600px] text-black">
            <thead className="font-bold">
              <tr className="border-b">
                <th className="px-4 py-2 text-left flex items-center gap-2">
                  <img src={TicketIcon} className="h-4" />
                  Ticket ID
                </th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left flex items-center gap-2">
                  <img src={TimeIcon} className="h-4" />
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4">{item.id}</td>
                  <td className="py-3 px-4">{item.title}</td>
                  <td className="py-3 px-4">{item.status}</td>
                  <td className="py-3 px-4">{item.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2 mt-6 text-sm text-gray-700">
          <button className="flex items-center gap-1 text-gray-400 cursor-not-allowed px-3 py-1">
            <img src={ArrowLeft} alt="Previous" className="h-4" />
            Previous
          </button>
          <button className="bg-[#0C0E5D] text-white px-3 py-1 rounded-sm">
            1
          </button>
          <button className="hover:bg-gray-200 px-3 py-1 rounded-sm">2</button>
          <button className="hover:bg-gray-200 px-3 py-1 rounded-sm">3</button>
          <span className="text-gray-500 px-1">...</span>
          <button className="flex items-center gap-1 text-[#0C0E5D] px-3 py-1 font-medium hover:underline">
            Next
            <img src={ArrowRight} alt="Next" className="h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default AgentDashboard;
