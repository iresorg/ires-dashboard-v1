import React, { useEffect, useState } from "react";
import CloseIcon from "@/shared/assets/icons/close.svg";
import Arrow from "@/shared/assets/icons/arrow.svg";

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

interface TicketDrawerProps {
  ticket: InternalTicket | null;
  onClose: () => void;
}

const TicketDrawer: React.FC<TicketDrawerProps> = ({ ticket, onClose }) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(true);
  const [isReportedByOpen, setIsReportedByOpen] = useState(true);

  useEffect(() => {
    console.log("TicketDrawer mounted with ticket:", ticket);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [ticket]);

  if (!ticket) {
    console.log("TicketDrawer not rendering: ticket is null");
    return null;
  }

  const toggleDescription = () => {
    console.log("Toggling Ticket Description, current state:", isDescriptionOpen);
    setIsDescriptionOpen(!isDescriptionOpen);
  };

  const toggleMaterials = () => {
    console.log("Toggling Materials / Artifacts, current state:", isMaterialsOpen);
    setIsMaterialsOpen(!isMaterialsOpen);
  };
  const toggleReportedBy = () => {
    console.log("Toggling Reported By, current state:", isReportedByOpen);
    setIsReportedByOpen(!isReportedByOpen);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black opacity-30"
        onClick={onClose}
      />
      <div
        className="relative bg-white rounded-lg shadow-md px-4 py-3 w-full max-w-xl h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
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
            className="flex justify-between bg-[#EBEBEB] p-2 mb-3 px-5 cursor-pointer"
            onClick={toggleDescription}
            role="button"
            aria-expanded={isDescriptionOpen}
          >
            <p className="block text-sm font-medium text-[#0C0E5D]">
              Ticket Description
            </p>
            <img
              src={Arrow}
              alt="Toggle Ticket Description"
              className={`w-4 h-4 transition-transform duration-200 ${isDescriptionOpen ? "rotate-180" : ""}`}
            />
          </div>
          {isDescriptionOpen && (
            <div className="space-y-2 border border-[#D4CDCD]/30 rounded-xl px-2 pt-1 pb-3">
              <div>
                <p className="text-sm text-[#0C0E5D]">
                  🧾 Incident Summary (Agent's Notes):
                </p>
                <p className="text-xs">
                  {ticket.description?.incidentSummary ||
                    "A customer called in to report that they received an email claiming to be from Zenith Bank, asking them to verify their account due to “suspicious activities.” The email contained a link to a fraudulent website resembling the bank’s login page. The customer did not click the link but was concerned because the email included their full name and part of their account number."}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#0C0E5D]">
                  🧾 Customer’s Statement:
                </p>
                <p className="text-xs">
                  {ticket.description?.customerStatement ||
                    '"I received an email today around 8:15 AM with the subject line ‘Urgent Action Required: Account Compromise Alert’. It said my account would be suspended unless I verified it by clicking a link. It looked real, it had the bank’s logo and even showed part of my account number. I didn’t click on anything, but I’m scared they might already have some of my info."'}
                </p>
              </div>
            </div>
          )}
        </div>
        <div>
          <div
            className="flex justify-between bg-[#EBEBEB] p-2 mb-3 mt-3 px-5 cursor-pointer"
            onClick={toggleMaterials}
            role="button"
            aria-expanded={isMaterialsOpen}
          >
            <p className="block text-sm font-medium text-[#0C0E5D]">
              🧩 Materials / Artifacts Logged:
            </p>
            <img
              src={Arrow}
              alt="Toggle Materials"
              className={`w-4 h-4 transition-transform duration-200 ${isMaterialsOpen ? "rotate-180" : ""}`}
            />
          </div>
          {isMaterialsOpen && (
            <div className="space-y-1 border border-[#D4CDCD]/30 rounded-xl px-2 pt-3 pb-3">
              <div className="flex-col">
                <p className="text-xs">📎 Files Uploaded:</p>
                <p className="">
                  {ticket.description?.materials?.filesUploaded?.join(", ") || "None"}
                </p>
              </div>
              <div className="flex">
                <p className="text-xs text-[#0C0E5D] mr-1">🔗 Phishing Link:</p>
                <p className="text-xs text-[#16C066]">
                  {ticket.description?.materials?.phishingLink ||
                    "http://zenith-secureauth.verify-banking.com"}
                </p>
              </div>
              <div className="flex">
                <p className="text-xs text-[#0C0E5D] mr-1">📅 Date Email Received:</p>
                <p className="text-xs">
                  {ticket.description?.materials?.dateEmailReceived || "July 24, 2025"}
                </p>
              </div>
              <div className="flex">
                <p className="text-xs text-[#0C0E5D] mr-1">🕐 Time Email Received:</p>
                <p className="text-xs">
                  {ticket.description?.materials?.timeEmailReceived || "08:15 AM"}
                </p>
              </div>
              <div className="flex">
                <p className="text-xs text-[#0C0E5D] mr-1">✉️ Sender Email:</p>
                <p className="text-xs text-[#16C066]">
                  {ticket.description?.materials?.senderEmail || "zenithbank@secure-notify.com"}
                </p>
              </div>
              <div className="flex">
                <p className="text-xs text-[#0C0E5D] mr-1">📍 IP Address from Headers:</p>
                <p className="text-xs">
                  {ticket.description?.materials?.ipAddress || "198.51.100.17 (Nigeria-based)"}
                </p>
              </div>
              <div className="flex">
                <p className="text-xs text-[#0C0E5D] mr-1">🔐 Sensitive Info Exposed:</p>
                <p className="text-xs text-[#0C0E5D]">
                  {ticket.description?.materials?.sensitiveInfoExposed ||
                    "Full name, Last digits of account number and Email address"}
                </p>
              </div>
            </div>
          )}
        </div>
        <div
            className="flex justify-between bg-[#EBEBEB] p-2 mb-3 mt-3 px-5 cursor-pointer"
            onClick={toggleReportedBy}
            role="button"
            aria-expanded={isReportedByOpen}
          >
            <p className="block text-sm font-medium text-[#0C0E5D]">
              👤 Reported By (Agent):
            </p>
            <img
              src={Arrow}
              alt="Toggle Materials"
              className={`w-4 h-4 transition-transform duration-200 ${isReportedByOpen ? "rotate-180" : ""}`}
            />
          </div>
          {isReportedByOpen && (
          <div className="space-y-1 border border-[#D4CDCD]/30 rounded-xl px-2 pt-3 pb-3">
              <div className="flex">
                <p className="text-xs text-[#0C0E5D] mr-1">Name:</p>
                <p className="text-xs ">
                  {ticket.reportedBy?.name || "Cynthia Adewale"}
                </p>
              </div>
              <div className="flex">
                <p className="text-xs text-[#0C0E5D] mr-1">Role:</p>
                <p className="text-xs">
                   {ticket.reportedBy?.role || "Agent"}
                </p>
              </div>
              <div className="flex">
                <p className="text-xs text-[#0C0E5D] mr-1">Date Logged:</p>
                <p className="text-xs">
                  {ticket.reportedBy?.dateLogged || "July 24, 2025"}
                </p>
              </div>
              <div className="flex">
                <p className="text-xs text-[#0C0E5D] mr-1">Time Logged:</p>
                <p className="text-xs">
                  {ticket.reportedBy?.timeLogged || "10:42 AM"}
                </p>
              </div>
            </div>
)}
</div>
        <div className="flex items-center justify-center mt-6">
          <button
            onClick={onClose}
            className="rounded-full px-8 py-2 bg-[var(--ires-dark-blue)] text-white hover:bg-[var(--ires-navy-blue)]"
          >
            Close
          </button>
        </div>
      </div>
  );
};

export default TicketDrawer;