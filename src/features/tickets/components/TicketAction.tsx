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
    <div className="fixed inset-0 z-50" aria-modal="true" role="dialog">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      <div
        className="fixed right-0 top-0 h-full w-full max-w-xl bg-white shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full px-4 py-3 overflow-y-auto">
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-lg font-semibold bg-[#0C0E5D] text-white px-4 rounded-xl">{ticket.ticket || "N/A"}</p>
            </div>
            <div>
              <img
                src={CloseIcon}
                alt="Close"
                onClick={onClose}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
          <div className="-mx-4">
            <hr className="border-0 h-2 bg-[#D4CDCD]/30 w-full mt-3" />
          </div>

          <div className="space-y-4 flex justify-between mt-3">
            <div className="flex">
              <p className="block text-sm font-medium text-[#0C0E5D]">
                Ticket Title :
              </p>
              <p className="block text-sm font-medium text-[#000000] ml-1">
                {ticket.title || "N/A"}
              </p>
            </div>
            <div className="flex">
              <label className="block text-sm font-medium text-[#0C0E5D]">
                Date & Time Created :
              </label>
              <p className="block text-sm font-medium text-[#000000] ml-1">
                {ticket.createdAt || "2025-07-24 11:00 AM"}
              </p>
            </div>
          </div>
          <div>
            <div
              className="flex justify-between bg-[#EBEBEB] p-2 mb-3 px-5 cursor-pointer rounded-bl-lg rounded-br-lg"
            >
              <p className="block text-sm font-medium text-[#0C0E5D]">
                Ticket Actions
              </p>
            </div>
            <div className="flex-col border !border-[#D4CDCD] rounded-xl px-2 pt-4 pb-3">
              <div className="flex">
                <div className="flex flex-col text-xs text-[#0C0E5D] items-center ml-25 mr-5 font-Medium mt-0.5">
                  <p className="mb-5">Ticket Status</p>
                  <p className="mb-5">Severity</p>
                  <p className="mb-5">Tier</p>
                  <p className="mb-5">Assign Responder</p>
                  <p className="mb-5">Notes(Optional)</p>
                </div>
                <div className="flex-row justify-between text-xs">
                  <div className="flex justify-between bg-[#D9D9D9] w-50 px-3 rounded-sm mb-3.5 text-sm font-medium">
                    <p>Pending</p>
                    <img src={Arrow} />
                  </div>
                  <div className="flex justify-between bg-[#D9D9D9] w-50 px-3 rounded-sm mb-3.5">
                    <p className="mt-0.5">-Select-</p>
                    <img src={Arrow} />
                  </div>
                  <div className="flex justify-between bg-[#D9D9D9] w-50 px-3 rounded-sm mb-3.5">
                    <p className="mt-0.5">-Select-</p>
                    <img src={Arrow} />
                  </div>
                  <div className="flex justify-between bg-[#D9D9D9] w-50 px-3 rounded-sm mb-3.5">
                    <p className="mt-0.5">-Select-</p>
                    <img src={Arrow} />
                  </div>
                  <div>
                    <input
                      placeholder="Type here....."
                      className="border rounded-sm !border-[#D4CDCD] pl-3 pb-15 pr-15 pt-1 text-xs text-[#D4CDCD]/100"
                    />
                  </div>
                </div>
              </div>
              <div className="ml-80 mt-10 mb-5">
                <button className="bg-[#0C0E5D] text-[#ffffff] px-8 rounded-tl-3xl rounded-br-3xl text-sm font-medium">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketAction;