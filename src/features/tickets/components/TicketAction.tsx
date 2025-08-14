import React, { useEffect } from "react";
import CloseIcon from "@/shared/assets/icons/close.svg";
import Arrow from "@/shared/assets/icons/dropdown2.svg";

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
  createdAt?: string;
  description?: {
    incidentSummary?: string;
    customerStatement?: string;
    materials?: {
      filesUploaded?: string[];
      phishingLink?: string;
      dateEmailReceived?: string;
      timeEmailReceived?: string;
      senderEmail?: string;
      ipAddress?: string;
      sensitiveInfoExposed?: string;
    };
  };
  reportedBy?: {
    name: string;
    role: string;
    dateLogged: string;
    timeLogged: string;
  };
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative z-10 bg-white rounded-lg shadow-md px-6 py-12 w-full max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row justify-center mb-6 space-x-1">
          <h2 className="text-xl font-semibold text-center">
            Ticket Management
          </h2>
        </div>
        <div className="absolute top-2 right-2 cursor-pointer">
          <img
            src={CloseIcon}
            alt="Close/Cancel"
            onClick={onClose}
            className="w-5 h-5"
          />
        </div>
        <div className="space-y-5 flex flex-col justify-center items-center">
          <div className="relative w-[70%]">
            <select
              className="w-full rounded-xl bg-[#D9D9D9]/70  px-4 py-2 pr-8 focus:outline-none appearance-none"
            >
              <option value={ticket.status} className="bg-white">
                {ticket.status}
              </option>
              <option value="Analyzing" className="bg-white">
                Analyzing
              </option>
              <option value="Assigned" className="bg-white">
                Assigned
              </option>
              <option value="In Progress" className="bg-white">
                In Progress
              </option>
              <option value="Escalated" className="bg-white">
                Escalated
              </option>
              <option value="Reassigned" className="bg-white">
                Reassigned
              </option>
              <option value="Resolved" className="bg-white">
                Resolved
              </option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <img src={Arrow} alt="dropdown" className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketAction;
