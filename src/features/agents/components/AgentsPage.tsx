import React, { useState } from "react";
import AddIcon from "@/shared/assets/icons/add.svg";
import ActionIcon from "@/shared/assets/icons/actions.svg";
import EditIcon from "@/shared/assets/icons/edit.svg";
import DeactivateIcon from "@/shared/assets/icons/scissors.svg";
import EmailIcon from "@/shared/assets/icons/icon.svg";
import BinIcon from "@/shared/assets/icons/delete.svg";
import AgentIcon from "@/shared/assets/icons/adminusers.svg";
import SearchIcon from "@/shared/assets/icons/search.svg";
import GreenButton from "@shared/assets/icons/Ellipse 8.svg";
import ArrowLeft from "@/shared/assets/icons/arrowleft.svg";
import ArrowRight from "@/shared/assets/icons/arrowright.svg";
import CreateAgentModal from "@/features/agents/components/CreateAgentModal";
import ConfirmAgentModal from "@/features/agents/components/ConfirmAgentModal";
import CreateAgentSucessModal from "@/features/agents/components/CreateAgentSucessModal";

{/* Import Profile Images -- I can't think of a better way to do this */}
import LexisPic from "@/shared/assets/images/lexis.png";
import WilliamPic from "@/shared/assets/images/william.png";

interface Agent {
  profilePic: string; // Assuming profile is a string path to an image
  id: string;
  email: string;
  status: string;
}

const AgentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateAgentModal, setShowCreateAgentModal] = useState(false);
  const [showConfirmAgentModal, setShowConfirmAgentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newAgentId, setNewAgentId] = useState<string | null>(null);

  const agents: Agent[] = [
    {
      profilePic: LexisPic,
      id: "Lexis Colenial", 
      email: "lexiscole@gmail.com",
      status: "Inactive",
    },
    {
      profilePic: LexisPic,
      id: "Esther Howard",
      email: "estherhoward@gmail.com",
      status: "Active",
    },
    {
      profilePic: WilliamPic,
      id: "William Ash",
      email: "william.ash@gmail.com",
      status: "Active",
    },
    {
      profilePic: LexisPic,
      id: "Lexis Colenial",
      email: "lexiscole@gmail.com",
      status: "Inactive",
    },
    {
      profilePic: WilliamPic,
      id: "William Ash",
      email: "william.ash@gmail.com",
      status: "Active",
    },
  ];

  const filteredAgents = agents.filter((agent) =>
    agent.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAgentSubmit = () => {
    setShowCreateAgentModal(false);
    setShowConfirmAgentModal(true);
  };

  const generateAgentId = () => {
    return `AGNT${Math.floor(1000 + Math.random() * 9000)}${String.fromCharCode(
      65 + Math.floor(Math.random() * 26)
    )}`;
  };

  const handleConfirm = () => {
    const agentId = generateAgentId();
    setNewAgentId(agentId);
    setShowConfirmAgentModal(false);
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    setNewAgentId(null);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <button
          onClick={() => setShowCreateAgentModal(true)}
          className="flex flex-col items-center justify-center px-6 py-3 bg-[var(--ires-dark-blue)] text-white rounded-lg hover:bg-[var(--ires-navy-blue)]"
        >
          <img src={AddIcon} alt="Add Agent" className="h-5 mb-1" />
          <span className="text-sm font-semibold">Create Agent</span>
        </button>

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
                  <img src={AgentIcon} alt="Agent Icon" className="h-5" />
                  Full Name
                </span>
              </th>
              <th className="py-3 px-4 font-semibold whitespace-nowrap">
                <span className="inline-flex items-center gap-2">
                  <img src={EmailIcon} alt="Email Icon" className="h-4" />
                  Email
                </span>
              </th>
              <th className="w-[150px] px-4 py-2 text-left">
                <div className="flex items-center space-x-2">
                  <img src={GreenButton} className="h-4" />
                  <span>Status</span>
                </div>
              </th>
              <th className="py-3 px-4 font-semibold whitespace-nowrap text-left">
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
                <td className="inline-flex items-center gap-2 px-3 py-5 whitespace-nowrap">
                  <img src={agent.profilePic} alt={agent.id + " Profile Pic"} className="h-5" />
                  <span>{agent.id}</span>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {agent.email}
                </td>
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
                  <div className="flex items-center justify-start space-x-4">
                    {/* All buttons do not navigate */}
                    <button
                      type="button"
                      className="flex items-center space-x-1 bg-[#D9D9D9] px-3 py-1 rounded-lg text-sm hover:bg-gray-300"
                    >
                      <span>View Details</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center space-x-1 bg-[#D9D9D9] px-3 py-1 rounded-lg text-sm hover:bg-gray-300"
                    >
                      <span>Edit</span>
                      <img src={EditIcon} alt="Edit Icon" className="h-4" />
                    </button>
                    <button
                      type="button"
                      className="flex items-center space-x-1 bg-[#D00F24]/11 px-3 py-1 rounded-lg text-sm text-[#D00F24] hover:bg-red-200"
                    >
                      <span>Deactivate</span>
                      <img src={DeactivateIcon} alt="Deactivate Icon" className="h-4" />
                    </button>
                    <button
                      type="button"
                      className="flex items-center space-x-1 px-3 py-1"
                    >
                      <img src={BinIcon} alt="Bin Icon"/>
                    </button>
                    {/* All buttons do not navigate */}
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

      {/* Modals */}
      {showCreateAgentModal && (
        <CreateAgentModal
          onClose={() => setShowCreateAgentModal(false)}
          onSubmit={handleAgentSubmit}
        />
      )}
      {showConfirmAgentModal && (
        <ConfirmAgentModal
          onConfirm={handleConfirm}
          onClose={() => setShowConfirmAgentModal(false)}
        />
      )}
      {showSuccessModal && (
        <CreateAgentSucessModal
          onClose={handleSuccessClose}
          id={newAgentId || ""}
        />
      )}
    </div>
  );
};

export default AgentsPage;
