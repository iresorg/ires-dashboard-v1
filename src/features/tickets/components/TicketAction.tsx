import React, { useEffect, useState } from "react";
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
  const [selectedStatus, setSelectedStatus] = useState(ticket?.status || "");
  useEffect(() => {
    console.log("TicketAction mounted with ticket:", ticket);
    setSelectedStatus(ticket?.status || "");
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [ticket]);

  if (!ticket) {
    console.log("TicketAction not rendering: ticket is null");
    return null;
  }

  const STATUS_OPTIONS = [
    "Pending",
    "Analyzing",
    "Assigned",
    "In Progress",
    "Escalated",
    "Reassigned",
    "Resolved",
  ];

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
        className="relative z-10 bg-white rounded-lg shadow-md px-6 py-10 w-full max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 space-x-1">
          <h2 className="text-xl font-semibold text-center">
            Update Ticket Status
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
        <div className="space-y-5 flex justify-center items-center">
          <div className="relative w-[70%]">
            <select
              className="w-full rounded-xl bg-[#D9D9D9]/70 px-4 py-2 pr-8 focus:outline-none appearance-none"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status} className="bg-white">
                  {status}
                </option>
              ))}
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
