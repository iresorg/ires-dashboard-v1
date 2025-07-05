import React, { useState } from "react";
import AddIcon from "@/shared/assets/icons/add.svg";
import ActionIcon from "@/shared/assets/icons/actions.svg";
import AgentIcon from "@/shared/assets/icons/adminusers.svg";
import SearchIcon from "@/shared/assets/icons/search.svg";
import GreenButton from "@shared/assets/icons/Ellipse 8.svg";
import ArrowLeft from "@/shared/assets/icons/arrowleft.svg";
import ArrowRight from "@/shared/assets/icons/arrowright.svg";


const agents = [
  {
    id: "AGNT117J",
    status: "Active",
    createdAt: "2025-06-01",
    updatedAt: "2025-06-20",
  },
  {
    id: "AGNT117J",
    status: "Inactive",
    createdAt: "2025-06-05",
    updatedAt: "2025-06-10",
  },
  {
    id: "AGNT117J",
    status: "Active",
    createdAt: "2025-06-01",
    updatedAt: "2025-06-20",
  },
];

const AgentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgents = agents.filter((agent) =>
    agent.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        {/* Button */}
        <button className="flex flex-col items-center justify-center px-6 py-3 bg-[var(--ires-dark-blue)] text-white rounded-lg hover:bg-[var(--ires-navy-blue)]">
          <img src={AddIcon} alt="Add Agent" className="h-5 mb-1" />
          <span className="text-sm font-semibold">Create Agent</span>
        </button>

        {/* Search */}
        <div className="relative">
          <img
            src={SearchIcon}
            alt="Search Icon"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search ID"
            className="pl-10 pr-4 bg-[#D9D9D9] text-sm w-64 h-10 rounded-sm flex items-center"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr className="border-b">
              <th className="py-3 px-4 font-semibold whitespace-nowrap">
                <span className="inline-flex items-center gap-2">
                  <img src={AgentIcon} alt="Agent" className="h-5" />
                  Agent ID
                </span>
              </th>
              <th className="w-[150px] px-4 py-2 text-left">
                <div className="flex items-center space-x-2">
                  <img src={GreenButton} className="h-4" />
                  <span>Status</span>
                </div>
              </th>
              <th className="py-3 px-4 font-semibold whitespace-nowrap">
                Created At
              </th>
              <th className="py-3 px-4 font-semibold whitespace-nowrap">
                Updated At
              </th>
              <th className="py-3 px-4 font-semibold whitespace-nowrap text-center">
                <span className="inline-flex items-center gap-2 justify-center">
                  <img src={ActionIcon} alt="Actions" className="h-5" />
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {filteredAgents.map((agent, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 whitespace-nowrap">{agent.id}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        agent.status === "Active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />
                    <span
                      className={`${
                        agent.status === "Active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {agent.status}
                    </span>
                  </span>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {agent.createdAt}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {agent.updatedAt}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <button className="px-3 py-1 rounded bg-[#D9D9D9] hover:bg-gray-200 text-sm">
                      View Details
                    </button>
                    <button className="px-3 py-1 rounded bg-red-100 hover:bg-red-200 text-red-600 text-sm">
                      Manage Tokens
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-20 text-sm text-gray-700">
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

export default AgentsPage;
