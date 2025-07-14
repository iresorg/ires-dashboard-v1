import React from "react";
import Settings from "@/shared/assets/icons/actions.svg";
import Vector from "@/shared/assets/icons/respond.svg";
import Update from "@/shared/assets/icons/update.svg";

interface InternalTicket {
  id: string;
  ticket: string;
  title: string;
  status: string;
  severity: string;
  tier: string;
  assignedto: string;
  updatedAt: string;
  actions: string;
}

interface TicketsTableProps {
  tickets: InternalTicket[];
}

const TicketsTable: React.FC<TicketsTableProps> = ({ tickets }) => {
  return (
    <div className="flex-1 overflow-auto mt-4">
      <table className="min-w-full table-fixed border-collapse text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="w-[100px] px-4 py-2 text-left">
              <div className="flex items-center whitespace-nowrap">
                <span>Ticket ID</span>
              </div>
            </th>
            <th className="w-[150px] px-4 text-left">
              <div className="flex items-center space-x-2">
                <span>Title</span>
              </div>
            </th>
            <th className="w-[50px] px-4 py-2 text-left">
              <div className="flex items-center space-x-2">
                <span>Status</span>
              </div>
            </th>
            <th className="w-[50px] px-4 py-2 text-left">
              <div className="flex items-center space-x-2">
                <span>Severity</span>
              </div>
            </th>
            <th className="w-[150px] px-4 py-2 text-left whitespace-nowrap">
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <span className="whitespace-nowrap">Tier</span>
              </div>
            </th>
            <th className="w-[150px] px-4 py-2 text-left">
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <span>Assigned To</span>
              </div>
            </th>
            <th className="w-[150px] px-4 py-2 text-left">
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <span>Updated At</span>
              </div>
            </th>
            <th className="w-[200px] px-4 py-2 text-left">
              <div className="flex items-center space-x-2">
                <img className="h-5 w-5" src={Settings}></img>
                <span>Actions</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="border-t border-[#D4CDCD]">
              <td className="px-4 py-4">{ticket.id}</td>
              <td className="px-4 py-4">{ticket.title}</td>
              <td className="px-4 py-4">
                <span className={`text-[#000000] ${
                    ticket.status === "Escalated" ? "bg-[#D00F24]" :
                    ticket.status === "Analyzing" ? "bg-[#D9CEED]" :
                    ticket.status === "Assigned" ? "bg-[#FF7143]" :
                    "bg-gray-500"
                }  px-2 py-1 rounded-xl`}>
                    {ticket.status}
                </span>
              </td>
              <td className="px-4 py-4">{ticket.severity}</td>
              <td className="px-4 py-4">{ticket.tier}</td>
              <td className="px-4 py-4">{ticket.assignedto}</td>
              <td className="px-4 py-4">{ticket.updatedAt}</td>
              <td className="px-4 py-4">
                <div className="flex items-center space-x-4">
                  <button
                    className="flex items-center space-x-1 bg-[#D9D9D9] pl-2 pr-2 rounded-sm -ml-5">
                    <span className="text-xs whitespace-nowrap pr-0 mr-0 ">View Ticket</span>
                  </button>
                    <img
                    src={Vector}
                    className="h-4 w-4 cursor-pointer -ml-3 mr-1"
                    />
                    <img
                    src={Update}
                    className="h-4 w-4 cursor-pointer"
                    />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketsTable;