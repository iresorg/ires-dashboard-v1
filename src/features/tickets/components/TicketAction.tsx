import React, { useEffect } from "react";
import CloseIcon from "@/shared/assets/icons/close.svg";

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

interface TicketActionProps {
  ticket: InternalTicket | null;
  onClose: () => void;
}

const TicketAction: React.FC<TicketActionProps> = ({ ticket, onClose }) => {
  useEffect(() => {
    console.log("TicketAction mounted with ticket:", ticket);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [ticket]);

  if (!ticket) {
    console.log("TicketAction not rendering: ticket is null");
    return null;
  }

  const handleAction = (action: string) => {
    console.log(`Action "${action}" clicked for ticket:`, ticket);
    // Placeholder for action handling; can be extended with callback props
    onClose();
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30"
        onClick={onClose}
      />
      <div
        className="relative bg-white rounded-lg shadow-md px-6 py-12 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row justify-center mb-6 space-x-1">
          <h2 className="text-xl font-semibold text-center">Ticket Actions</h2>
        </div>
        <div className="absolute top-2 right-2 cursor-pointer">
          <img
            src={CloseIcon}
            alt="Close"
            onClick={onClose}
            className="w-4 h-4"
          />
        </div>
        <div className="space-y-4">
          <p className="text-sm text-gray-700">
            Actions for Ticket ID: {ticket.id} ({ticket.title})
          </p>
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleAction("Edit")}
              className="w-full rounded-xl bg-[#D9D9D9]/70 px-4 py-2 text-left text-sm hover:bg-[#D9D9D9]"
            >
              Edit Ticket
            </button>
            <button
              onClick={() => handleAction("Assign")}
              className="w-full rounded-xl bg-[#D9D9D9]/70 px-4 py-2 text-left text-sm hover:bg-[#D9D9D9]"
            >
              Assign Ticket
            </button>
            <button
              onClick={() => handleAction("Escalate")}
              className="w-full rounded-xl bg-[#D9D9D9]/70 px-4 py-2 text-left text-sm hover:bg-[#D9D9D9]"
            >
              Escalate Ticket
            </button>
            <button
              onClick={() => handleAction("Close")}
              className="w-full rounded-xl bg-[#D9D9D9]/70 px-4 py-2 text-left text-sm hover:bg-[#D9D9D9]"
            >
              Close Ticket
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center mt-6">
          <button
            onClick={onClose}
            className="rounded-full px-8 py-2 bg-[var(--ires-dark-blue)] text-white hover:bg-[var(--ires-navy-blue)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketAction;