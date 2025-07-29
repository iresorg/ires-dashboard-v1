import React, { useState } from "react";
import AddIcon from "@/shared/assets/icons/add.svg";
import Search from "@/shared/assets/icons/lineicons_search-2.svg";
import ActionIcon from "@/shared/assets/icons/actions.svg";
import PersonIcon from "@/shared/assets/icons/Vector.svg";
import EmailIcon from "@/shared/assets/icons/icon.svg";
import GreenDot from "@/shared/assets/icons/Ellipse 8.svg";
import RedDot from "@/shared/assets/icons/Ellipse 9.svg";
import Pen from "@/shared/assets/icons/pen.svg";
import Scissors from "@/shared/assets/icons/scissors.svg";
import Trash from "@/shared/assets/icons/delete.svg";
import ProfileImage from "@/shared/assets/images/profile.png";
import ArrowLeft from "@/shared/assets/icons/arrowleft.svg";
import ArrowRight from "@/shared/assets/icons/arrowright.svg";
import CreateAgentModal from "@/features/agents/components/CreateAgentModal";
import ConfirmAgentModal from "@/features/agents/components/ConfirmAgentModal";
import CreateAgentSucessModal from "@/features/agents/components/CreateAgentSucessModal";
import EditAgentModal from "@/features/agents/components/EditAgentModal";

interface Agent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: "Active" | "Inactive";
}

const AgentsPage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "AGNT117J",
      firstName: "Mark",
      lastName: "Johnson",
      email: "mark.johnson@example.com",
      status: "Active",
    },
    {
      id: "AGNT224Z",
      firstName: "Sarah",
      lastName: "Brown",
      email: "sarah.brown@example.com",
      status: "Inactive",
    },
    {
      id: "AGNT339B",
      firstName: "James",
      lastName: "Taylor",
      email: "james.taylor@example.com",
      status: "Active",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateAgentModal, setShowCreateAgentModal] = useState(false);
  const [showConfirmAgentModal, setShowConfirmAgentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pendingAgent, setPendingAgent] = useState<Agent | null>(null);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [confirming, setConfirming] = useState<{
    type: "deactivate" | "delete";
    agent: Agent;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const agentsPerPage = 4;

  const filteredAgents = agents.filter((agent) =>
    `${agent.firstName} ${agent.lastName} ${agent.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAgents.length / agentsPerPage);
  const indexOfLastAgent = currentPage * agentsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
  const currentAgents = filteredAgents.slice(indexOfFirstAgent, indexOfLastAgent);

  const generateAgentId = () => {
    return `AGNT${Math.floor(1000 + Math.random() * 9000)}${String.fromCharCode(
      65 + Math.floor(Math.random() * 26)
    )}`;
  };

  const handleAgentSubmit = (data: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    const newAgentData: Agent = {
      id: generateAgentId(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      status: "Active",
    };
    setPendingAgent(newAgentData); // Store new agent temporarily
    setShowCreateAgentModal(false);
    setShowConfirmAgentModal(true);
  };

  const handleConfirm = () => {
    if (pendingAgent) {
      setAgents((prev) => [pendingAgent, ...prev]); // Add agent to state only after confirmation
      setShowConfirmAgentModal(false);
      setShowSuccessModal(true);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    setPendingAgent(null);
  };

  const handleEditAgent = (updatedAgent: Agent) => {
    setAgents((prev) =>
      prev.map((agent) => (agent.id === updatedAgent.id ? updatedAgent : agent))
    );
    setEditingAgent(null);
  };

  const handleDeactivateAgent = (id: string) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === id ? { ...agent, status: "Inactive" } : agent
      )
    );
  };

  const handleDeleteAgent = (id: string) => {
    setAgents((prev) => prev.filter((agent) => agent.id !== id));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <button
          type="button"
          onClick={() => setShowCreateAgentModal(true)}
          className="flex flex-col items-center justify-center px-6 py-3 bg-[var(--ires-dark-blue)] text-white rounded-lg hover:bg-[var(--ires-navy-blue)]"
        >
          <img src={AddIcon} alt="Add Agent" className="h-5 mb-1" />
          <span className="text-sm font-semibold">Create Agent</span>
        </button>

        <div className="flex items-center bg-[#D9D9D9] rounded-sm px-4 h-12 w-64">
          <img src={Search} className="h-5 mr-2" alt="Search" />
          <input
            type="text"
            className="bg-transparent outline-none text-sm w-full placeholder:text-gray-600"
            placeholder="Search Name/Email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto mt-6">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-2 py-1">
                <div className="flex items-center gap-0">
                  <img src={PersonIcon} className="h-4" alt="Person" />
                </div>
              </th>
              <th className="px-0 py-1">
                <div className="flex items-center gap-1">
                  <span>Full Name</span>
                </div>
              </th>
              <th className="px-4 py-1">
                <div className="flex items-center gap-1">
                  <img src={EmailIcon} className="h-4" alt="Email" />
                  <span>Email</span>
                </div>
              </th>
              <th className="px-4 py-1">
                <div className="flex items-center gap-1">
                  <img src={GreenDot} className="h-3" alt="Status" />
                  <span>Status</span>
                </div>
              </th>
              <th className="px-4 py-1">
                <div className="flex items-center gap-1">
                  <img src={ActionIcon} className="h-4" alt="Actions" />
                  <span>Actions</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentAgents.map((agent) => (
              <tr key={agent.id} className="border-t whitespace-nowrap">
                <td className="px-0 py-1">
                  <div className="flex items-center justify-start">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-white">
                      <img
                        src={ProfileImage}
                        alt={`${agent.firstName} ${agent.lastName}`}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-0 py-1">
                  <span>{`${agent.firstName} ${agent.lastName}`}</span>
                </td>
                <td className="px-4 py-1">{agent.email}</td>
                <td className="px-4 py-1">
                  <div className="flex items-center gap-1">
                    <img
                      src={agent.status === "Active" ? GreenDot : RedDot}
                      className="h-3"
                      alt={agent.status}
                    />
                    {agent.status}
                  </div>
                </td>
                <td className="px-4 py-1 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="flex items-center gap-1 bg-gray-300 rounded px-2 py-1 text-xs"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingAgent(agent)}
                      className="flex items-center gap-1 bg-gray-300 rounded px-2 py-1 text-xs"
                    >
                      Edit <img src={Pen} className="h-3" alt="Edit" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirming({ type: "deactivate", agent })}
                      className="flex items-center gap-1 bg-red-100 rounded px-2 py-1 text-xs"
                    >
                      Deactivate <img src={Scissors} className="h-3" alt="Deactivate" />
                    </button>
                    <img
                      src={Trash}
                      onClick={() => setConfirming({ type: "delete", agent })}
                      className="h-4 cursor-pointer"
                      alt="Delete"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-20 text-sm text-gray-700">
        <button
          type="button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3 py-1 ${
            currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-[#0C0E5D] hover:underline"
          }`}
        >
          <img src={ArrowLeft} alt="Previous" className="h-4" />
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-sm ${
              currentPage === page
                ? "bg-[#0C0E5D] text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-3 py-1 ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-[#0C0E5D] hover:underline"
          }`}
        >
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
      {showConfirmAgentModal && pendingAgent && (
        <ConfirmAgentModal
          type="create"
          userName={`${pendingAgent.firstName} ${pendingAgent.lastName}`}
          onConfirm={handleConfirm}
          onClose={() => {
            setShowConfirmAgentModal(false);
            setPendingAgent(null);
          }}
        />
      )}
      {showSuccessModal && pendingAgent && (
        <CreateAgentSucessModal
          onClose={handleSuccessClose}
          id={pendingAgent.id}
        />
      )}
      {editingAgent && (
        <EditAgentModal
          agent={editingAgent}
          onClose={() => setEditingAgent(null)}
          onSave={handleEditAgent}
        />
      )}
      {confirming && (
        <ConfirmAgentModal
          type={confirming.type}
          userName={`${confirming.agent.firstName} ${confirming.agent.lastName}`}
          onConfirm={() => {
            if (confirming.type === "deactivate") {
              handleDeactivateAgent(confirming.agent.id);
            } else {
              handleDeleteAgent(confirming.agent.id);
            }
            setConfirming(null);
          }}
          onClose={() => setConfirming(null)}
        />
      )}
    </div>
  );
};

export default AgentsPage;