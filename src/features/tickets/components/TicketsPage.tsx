import React, { useState } from "react";
import AddIcon from "@/shared/assets/icons/add.svg";
import Search from "@/shared/assets/icons/lineicons_search-2.svg";
import Filter from "@/shared/assets/icons/uiw_filter.svg";
import TicketsTable from "./TicketsTable";
import ArrowLeft from "@/shared/assets/icons/arrowleft.svg";
import ArrowRight from "@/shared/assets/icons/arrowright.svg";

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

const TicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<InternalTicket[]>([
    {
      id: "TKT-001",
      ticket: "TKT-001",
      title: "Phishing Mail",
      status: "Escalated",
      severity: "High",
      tier: "Tier 2",
      assignedto: "Responder-07",
      updatedAt: "2025-07-10",
      actions: "View Ticket",
    },
    {
      id: "TKT-002",
      ticket: "TKT-002",
      title: "Ransomware",
      status: "Analyzing",
      severity: "Medium",
      tier: "Tier 1",
      assignedto: "Responder-04",
      updatedAt: "2025-07-13",
      actions: "View Ticket",
    },
    {
      id: "TKT-003",
      ticket: "TKT-003",
      title: "DDOS Alert",
      status: "Assigned",
      severity: "Low",
      tier: "Tier 2",
      assignedto: "Responder-02",
      updatedAt: "2025-06-25",
      actions: "View Ticket",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTier, setFilterTier] = useState("");

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterTier === "" || ticket.tier === filterTier)
  );

  const handleCreateTicket = () => {
    console.log("Opening create ticket modal");
  };

  return (
    <div className="">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <button
          type="button"
          className="flex flex-col items-center justify-center px-6 py-3 bg-[var(--ires-dark-blue)] text-white rounded-lg hover:bg-[var(--ires-navy-blue)]"
          onClick={handleCreateTicket}
        >
          <img src={AddIcon} alt="Add Ticket" className="h-5 mb-1" />
          <span className="text-sm font-semibold">Create New Ticket</span>
        </button>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center bg-[#D9D9D9] rounded-sm px-4 h-12 w-64">
            <img src={Search} className="h-5 mr-2" alt="Search" />
            <input
              type="text"
              placeholder="Search ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm w-full placeholder:text-gray-600"
            />
          </div>

          <div className="flex items-center bg-[#D9D9D9] rounded-sm px-4 h-12 w-40">
            <img src={Filter} className="h-5 mr-2" alt="Filter" />
            <select
              className="bg-transparent outline-none text-sm text-gray-700 w-full"
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
            >
              <option value="">Filter by Tier</option>
              <option value="Tier 1">Tier 1</option>
              <option value="Tier 2">Tier 2</option>
            </select>
          </div>
        </div>
      </div>

      <TicketsTable tickets={filteredTickets} />
      <div className="flex items-center justify-center space-x-2 mt-5 text-sm text-gray-700">
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
      <div className="ml-3">
        <div>
          <p className="font-bold text-lg mb-4 mt-6">Status Progress Tracker</p>
        </div>
        <div>
          <button className="bg-[#D9D9D9] w-100 h-9 rounded-2xl mb-10"><span className="text-[#ffffff] bg-[#4A4A4A] rounded-xl -ml-83 text-xs font-bold pb-2.5 pr-3 pl-3 pt-3">Pending</span></button>
        </div> 
        <div>
          <p className="font-bold mb-3">Activities Log</p>
        </div>
        <div className="flex flex-row">
          <div className="mr-3">
            <p>July 7th,</p>
            <p>July 4th,</p>
            <p>June 29th,</p>
          </div>
          <div className="mr-3">
            <p>5:06PM</p>
            <p>2:30PM</p>
            <p>7:54PM</p>
          </div>
           <div className="mr-3">
            <p>-</p>
            <p>-</p>
            <p>-</p>
          </div>
           <div>
            <p>Status changed to ‘Analyzing’ by Responder Admin</p>
            <p>Assigned to Responder-04</p>
            <p>Responder updated status to ‘Resolved’</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;