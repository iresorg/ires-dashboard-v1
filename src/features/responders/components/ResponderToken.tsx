import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@/shared/assets/icons/add.svg";
import Search from "@/shared/assets/icons/lineicons_search-2.svg";
import Filter from "@/shared/assets/icons/uiw_filter.svg";
import ActionIcon from "@/shared/assets/icons/actions.svg";
import GreenButton from "@shared/assets/icons/Ellipse 8.svg";
import ArrowLeft from "@/shared/assets/icons/arrowleft.svg";
import ArrowRight from "@/shared/assets/icons/arrowright.svg";
import TokenIcon from "@/shared/assets/icons/token.svg";
import ResponderIcon from "@/shared/assets/icons/respondericon.svg";
import ManageResponderModal from "@/features/responders/components/ManageResponderModal";


interface TokenData {
  id: string;
  actualToken: string;
  isRevoked: boolean;
  tier: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}


const tokenData: TokenData[] = [
  {
    id: "TIRSP2117J",
    actualToken: "realtoken1",
    isRevoked: false,
    tier: "Tier2",
    status: "Active",
    createdAt: "2025-06-20",
    updatedAt: "2025-06-22",
    expiresAt: "2025-07-22",
  },
  {
    id: "TIRSP2123H",
    actualToken: "realtoken2",
    isRevoked: true,
    tier: "Tier1",
    status: "Inactive",
    createdAt: "2025-06-16",
    updatedAt: "2025-06-18",
    expiresAt: "2025-07-18",
  },
  {
    id: "TIRSP2145G",
    actualToken: "realtoken3",
    isRevoked: true,
    tier: "Tier1",
    status: "Active",
    createdAt: "2025-06-05",
    updatedAt: "2025-06-15",
    expiresAt: "2025-07-14",
  },
  {
    id: "TIRSP2109R",
    actualToken: "realtoken4",
    isRevoked: false,
    tier: "Tier2",
    status: "Active",
    createdAt: "2025-05-27",
    updatedAt: "2025-06-02",
    expiresAt: "2025-07-10",
  },

  
];

const RespondersToken: React.FC = () => {
  const { responderId } = useParams<{ responderId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState<TokenData | null>(null); 
  const filteredTokens = tokenData.filter((responder) =>
    responder.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (token: TokenData) => {

    setSelectedToken(token);
    setShowModal(true);
  };

  return (
    <div className="p-4 sm:p-6">
      {showModal && selectedToken && responderId && (
        <ManageResponderModal
          onClose={() => setShowModal(false)}
          responderId={responderId}
          token={selectedToken}
        />
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <button
          className="flex flex-col items-center justify-center px-6 py-3 bg-[var(--ires-dark-blue)] text-white rounded-lg hover:bg-[var(--ires-navy-blue)]"
          onClick={() => handleOpenModal(tokenData[0])}
        >
          <img src={AddIcon} alt="Generate Token" className="h-5 mb-1" />
          <span className="text-sm font-semibold">Generate Token</span>
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
              defaultValue=""
            >
              <option value="" disabled>
                Filter by Role
              </option>
              <option value="Field Responder">Field Responder</option>
              <option value="Remote Responder">Remote Responder</option>
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
              <th className="py-3 px-4 font-semibold whitespace-nowrap">
                Tier
              </th>
              <th className="w-[150px] px-4 py-2 text-left">
                <div className="flex items-center space-x-2">
                  <img src={GreenButton} className="h-4" alt="Status" />
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
            {filteredTokens.map((responder, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 whitespace-nowrap">{responder.id}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <button
                    className={`text-xs px-3 py-1 rounded-sm ${
                      responder.tier === "Tier2"
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-[#D9D9D9] text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {responder.tier}
                  </button>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
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
                <td className="py-3 px-4 whitespace-nowrap">
                  {responder.createdAt}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {responder.updatedAt}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center space-x-4">
                    <button
                      className="flex items-center space-x-1 bg-[#D00F24]/11 px-3 py-1 rounded-sm text-sm text-[#D00F24] hover:bg-red-200"
                      onClick={() => handleOpenModal(responder)}
                    >
                      <img src={TokenIcon} alt="Token Icon" />
                      <span>Regenerate</span>
                    </button>
                    <button className="flex items-center space-x-1 bg-[#D9D9D9] px-3 py-1 rounded-sm text-sm hover:bg-gray-300">
                      <span>Deactivate</span>
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

export default RespondersToken;
