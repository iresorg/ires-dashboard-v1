import React, { useState, useEffect } from "react";
import AddIcon from "@/shared/assets/icons/add.svg";
import SearchIcon from "@/shared/assets/icons/lineicons_search-2.svg";
import FilterIcon from "@/shared/assets/icons/uiw_filter.svg";
import ActionIcon from "@/shared/assets/icons/actions.svg";
import ResponderIcon from "@/shared/assets/icons/respondericon.svg";
import GreenDot from "@/shared/assets/icons/Ellipse 8.svg";
import ArrowLeft from "@/shared/assets/icons/arrowleft.svg";
import ArrowRight from "@/shared/assets/icons/arrowright.svg";
import TokenIcon from "@/shared/assets/icons/token.svg";

import CreateResponderModal from "./CreateResponderModal";

interface Responder {
  id: string;
  tier: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const responders: Responder[] = [
  {
    id: "TIRSP2117J",
    tier: "Tier2",
    status: "Active",
    createdAt: "2025-06-20",
    updatedAt: "2025-06-22",
  },
  {
    id: "TIRSP2123H",
    tier: "Tier1",
    status: "Inactive",
    createdAt: "2025-06-16",
    updatedAt: "2025-06-18",
  },
  {
    id: "TIRSP2145G",
    tier: "Tier1",
    status: "Active",
    createdAt: "2025-06-05",
    updatedAt: "2025-06-15",
  },
  {
    id: "TIRSP2109R",
    tier: "Tier2",
    status: "Active",
    createdAt: "2025-05-27",
    updatedAt: "2025-06-02",
  },
];

const RespondersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterTier, setFilterTier] = useState("");

  useEffect(() => {
    document.body.style.overflow = showCreateModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showCreateModal]);

  const filteredResponders = responders.filter((responder) => {
    const matchesSearch = responder?.id
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTier = filterTier ? responder.tier === filterTier : true;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="p-4 sm:p-6">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <button
          className="flex flex-col items-center justify-center px-6 py-3 bg-[var(--ires-dark-blue)] text-white rounded-lg hover:bg-[var(--ires-navy-blue)]"
          onClick={() => setShowCreateModal(true)}
        >
          <img src={AddIcon} alt="Add Responder" className="h-5 mb-1" />
          <span className="text-sm font-semibold">Create New Responder</span>
        </button>

        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="flex items-center bg-[#D9D9D9] rounded-sm px-4 h-12 w-64">
            <img src={SearchIcon} className="h-5 mr-2" />
            <input
              type="text"
              placeholder="Search ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm w-full placeholder:text-gray-600"
            />
          </div>

          {/* Filter by Tier */}
          <div className="flex items-center bg-[#D9D9D9] rounded-sm px-4 h-12 w-40">
            <img src={FilterIcon} className="h-5 mr-2" />
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-700 w-full"
            >
              <option value="">All Tiers</option>
              <option value="Tier1">Tier 1</option>
              <option value="Tier2">Tier 2</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr className="border-b">
              <th className="py-3 px-4 font-semibold whitespace-nowrap">
                <span className="inline-flex items-center gap-2">
                  <img src={ResponderIcon} alt="Responder" className="h-5" />
                  Responder ID
                </span>
              </th>
              <th className="py-3 px-4 font-semibold">Tier</th>
              <th className="py-3 px-4 font-semibold">
                <div className="flex items-center space-x-2">
                  <img src={GreenDot} className="h-4" />
                  <span>Status</span>
                </div>
              </th>
              <th className="py-3 px-4 font-semibold">Created At</th>
              <th className="py-3 px-4 font-semibold">Updated At</th>
              <th className="py-3 px-4 font-semibold text-center">
                <span className="inline-flex items-center gap-2 justify-center">
                  <img src={ActionIcon} alt="Actions" className="h-5" />
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {filteredResponders.map((responder) => (
              <tr key={responder.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{responder.id}</td>
                <td className="py-3 px-4">
                  <span
                    className={`text-xs px-3 py-1 rounded-sm ${
                      responder.tier === "Tier2"
                        ? "bg-red-100 text-red-600"
                        : "bg-[#D9D9D9] text-gray-800"
                    }`}
                  >
                    {responder.tier}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        responder.status === "Active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />
                    <span
                      className={`${
                        responder.status === "Active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {responder.status}
                    </span>
                  </span>
                </td>
                <td className="py-3 px-4">{responder.createdAt}</td>
                <td className="py-3 px-4">{responder.updatedAt}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 bg-[#D00F24]/11 px-3 py-1 rounded-sm text-sm text-[#D00F24] hover:bg-red-200">
                      <img src={TokenIcon} alt="Token Icon" />
                      <span>Tokens</span>
                    </button>
                    <button className="flex items-center space-x-1 bg-[#D9D9D9] px-3 py-1 rounded-sm text-sm hover:bg-gray-300">
                      <span>Manage Status</span>
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

      {/* Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          />
          <div className="relative z-10">
            <CreateResponderModal onClose={() => setShowCreateModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RespondersPage;
