import React, { useState } from "react";
import Settings from "@/shared/assets/icons/actions.svg";
import TicketDrawer from "@/features/tickets/components/TicketDrawer";
import TicketAction from "@/features/tickets/components/TicketAction";

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
  const [showViewTicket, setShowViewTicket] = useState(false);
  const [showActionsModal, setShowActionsModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<InternalTicket | null>(
    null
  );

  const handleViewTicket = (ticket: InternalTicket) => {
    console.log("View Ticket clicked for:", ticket);
    setSelectedTicket(ticket);
    setShowViewTicket(true);
    console.log(
      "State updated - showViewTicket:",
      true,
      "selectedTicket:",
      ticket
    );
  };

  const handleTicketActions = (ticket: InternalTicket) => {
    console.log("Ticket Actions clicked for:", ticket);
    setSelectedTicket(ticket);
    setShowActionsModal(true);
    console.log(
      "State updated - showActionsModal:",
      true,
      "selectedTicket:",
      ticket
    );
  };

  console.log("TicketsTable rendering with tickets:", tickets);

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
                <img className="h-5 w-5" src={Settings} alt="Actions" />
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
                <span onClick={() => handleTicketActions(ticket)}
                  className={`text-[#000000] ${
                    ticket.status === "Pending"
                      ? "bg-[#14AE5C]"
                      : ticket.status === "Analyzing"
                      ? "bg-[#D9CEED]"
                      : ticket.status === "Assigned"
                      ? "bg-[#FF7143]"
                      : "bg-gray-500"
                  } px-2 py-1 rounded-xl`}
                >
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
                    onClick={() => handleViewTicket(ticket)}
                    className="flex items-center space-x-1 bg-[#D9D9D9] pl-2 pr-2 rounded-sm"
                  >
                    <span className="text-xs whitespace-nowrap pr-0 mr-0">
                      View Ticket
                    </span>
                  </button>
                  <button
                    onClick={() => handleTicketActions(ticket)}
                    className="flex items-center space-x-1 bg-[#D9D9D9] pl-2 pr-2 rounded-sm"
                  >
                    <span className="text-xs whitespace-nowrap pr-0 mr-0">
                      Ticket Actions
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showViewTicket && selectedTicket && (
        <TicketDrawer
          ticket={selectedTicket}
          onClose={() => setShowViewTicket(false)}
        />
      )}
      {showActionsModal && selectedTicket && (
        <TicketAction
          ticket={selectedTicket}
          onClose={() => setShowActionsModal(false)}
        />
      )}
    </div>
  );
};

export default TicketsTable;
