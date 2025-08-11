import React, { useState } from "react";
import AddIcon from "@/shared/assets/icons/add.svg";
import Search from "@/shared/assets/icons/lineicons_search-2.svg";
import ArrowLeft from "@/shared/assets/icons/arrowleft.svg";
import ArrowRight from "@/shared/assets/icons/arrowright.svg";
import Settings from "@/shared/assets/icons/actions.svg";

interface Ticket {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

const initialTickets: Ticket[] = [
  {
    id: "TKT-005",
    title: "Ransomware",
    status: "In Progress",
    createdAt: "2025-06-09",
  },
  {
    id: "TKT-004",
    title: "Ransomware",
    status: "In Progress",
    createdAt: "2025-06-09",
  },
  {
    id: "TKT-003",
    title: "Ransomware",
    status: "Assigned",
    createdAt: "2025-06-09",
  },
  {
    id: "TKT-002",
    title: "Ransomware",
    status: "Escalated",
    createdAt: "2025-06-09",
  },
  {
    id: "TKT-001",
    title: "Ransomware",
    status: "Resolved",
    createdAt: "2025-06-09",
  },
];

const AgentTicket: React.FC = () => {
  const [tickets] = useState<Ticket[]>(initialTickets);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTickets = tickets.filter((ticket) =>
    ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          className="flex flex-col items-center justify-center px-6 py-3 bg-[var(--ires-dark-blue)] text-white rounded-lg hover:bg-[var(--ires-navy-blue)]"
          
        >
          <img src={AddIcon} alt="Add Ticket" className="h-5 mb-1" />
          <span className="text-sm font-semibold">Create Ticket</span>
        </button>
        <div className="flex items-center bg-[#D9D9D9] rounded-md px-4 h-12 w-64">
          <img src={Search} className="h-5 mr-2" alt="Search" />
          <input
            type="text"
            placeholder="Search  ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-sm w-full placeholder:text-gray-600"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="w-full table-auto text-sm border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Ticket ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created at</th>
             <th className="w-[200px] px-4 py-2 text-left">
                          <div className="flex items-center space-x-2">
                            <img className="h-5 w-5" src={Settings} alt="Actions" />
                            <span>Actions</span>
                          </div>
                        </th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id} className="border-t">
                <td className="px-4 py-2">{ticket.id}</td>
                <td className="px-4 py-2">{ticket.title}</td>
                <td className="px-4 py-2">{ticket.status}</td>
                <td className="px-4 py-2">{ticket.createdAt}</td>
                <td className="px-4 py-2">
                  <button
                    type="button"
                    className="px-3 py-1 bg-gray-200 rounded text-xs hover:bg-gray-300 font-medium"
                  >
                    View Ticket
                  </button>
                </td>
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
        <button className="hover:bg-gray-200 px-3 py-1 rounded-full">2</button>
        <button className="hover:bg-gray-200 px-3 py-1 rounded-full">3</button>
        <span className="text-gray-500 px-1">...</span>
        <button className="flex items-center gap-1 text-[#0C0E5D] px-3 py-1 font-medium hover:underline">
          Next
          <img src={ArrowRight} alt="Next" className="h-4" />
        </button>
      </div>
    </div>
  );
};

export default AgentTicket;
