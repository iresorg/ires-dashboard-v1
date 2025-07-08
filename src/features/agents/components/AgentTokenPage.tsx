import React, { useState } from "react";
import AddIcon from "@/shared/assets/icons/add.svg";
import ActionIcon from "@/shared/assets/icons/actions.svg";
import AgentIcon from "@/shared/assets/icons/adminusers.svg";
import SearchIcon from "@/shared/assets/icons/search.svg";
import ArrowLeft from "@/shared/assets/icons/arrowleft.svg";
import ArrowRight from "@/shared/assets/icons/arrowright.svg";
import RevokeIcon from "@/shared/assets/icons/revoke.svg";
import EyeIcon from "@/shared/assets/icons/eyetoggle.svg"; 

const Tokens = [
  {
    id: "***********",
    actualToken: "1234-5678-XYZ",
    isRevoked: true,
    expiresAt: "2025-07-01 12:00",
    createdAt: "2025-07-01 12:00",
    showToken: false,
  },
  {
    id: "***********",
    actualToken: "AABB-1122-CCDD",
    isRevoked: false,
    expiresAt: "2025-07-01 12:00",
    createdAt: "2025-07-01 12:00",
    showToken: false,
  },
  {
    id: "***********",
    actualToken: "ZXCV-7788-ASDF",
    isRevoked: true,
    expiresAt: "2025-07-01 12:00",
    createdAt: "2025-07-01 12:00",
    showToken: false,
  },
];

const AgentTokenPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tokens, setTokens] = useState(Tokens);

  const handleToggleToken = (index: number) => {
    const updated = [...tokens];
    updated[index].showToken = !updated[index].showToken;
    updated[index].id = updated[index].showToken
      ? updated[index].actualToken
      : "***********";
    setTokens(updated);
  };

  const handleRevoke = (index: number) => {
    const updated = [...tokens];
    updated[index].isRevoked = true;
    setTokens(updated);
  };

  const filteredTokens = tokens.filter((token) =>
    token.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <button className="flex flex-col items-center justify-center px-6 py-3 bg-[var(--ires-dark-blue)] text-white rounded-lg hover:bg-[var(--ires-navy-blue)]">
          <img src={AddIcon} alt="Add Token" className="h-5 mb-1" />
          <span className="text-sm font-semibold">Generate Token</span>
        </button>

        <div className="relative">
          <img
            src={SearchIcon}
            alt="Search Icon"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search Token"
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
                  Token
                </span>
              </th>
              <th className="w-[150px] px-4 py-2 text-left">Is Revoked</th>
              <th className="py-3 px-4 font-semibold whitespace-nowrap">
                Expires At
              </th>
              <th className="py-3 px-4 font-semibold whitespace-nowrap">
                Created At
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
            {filteredTokens.map((token, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 whitespace-nowrap">{token.id}</td>

                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        token.isRevoked ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <span
                      className={
                        token.isRevoked ? "text-green-600" : "text-red-600"
                      }
                    >
                      {token.isRevoked ? "Yes" : "No"}
                    </span>
                  </span>
                </td>

                <td className="py-3 px-4 whitespace-nowrap">
                  {token.expiresAt}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {token.createdAt}
                </td>

                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      onClick={() => handleRevoke(index)}
                      className="flex items-center space-x-2 px-3 py-1 rounded bg-green-100 hover:bg-green-200 text-black text-sm"
                    >
                      <img src={RevokeIcon} alt="Revoke" className="h-4 w-4" />
                      <span>Revoke</span>
                    </button>

                    <button
                      onClick={() => handleToggleToken(index)}
                      className="flex items-center space-x-2 px-3 py-1 rounded bg-red-100 hover:bg-red-200 text-black text-sm"
                    >
                      <img src={EyeIcon} alt="View/Hide" className="h-4 w-4" />
                      <span>
                        {token.showToken ? "Hide Token" : "View Token"}
                      </span>
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

export default AgentTokenPage;
