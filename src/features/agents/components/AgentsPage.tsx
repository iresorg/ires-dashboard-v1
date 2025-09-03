import React, { useEffect, useState } from "react";
import { useAgentStore } from "@/features/agents/store/agentStore";
import type { AgentProfile } from "@/features/agents/services/agentService";
import AddIcon from "@/shared/assets/icons/add.svg";
import Search from "@/shared/assets/icons/lineicons_search-2.svg";
import ActionIcon from "@/shared/assets/icons/actions.svg";
import PersonIcon from "@/shared/assets/icons/Vector.svg";
import EmailIcon from "@/shared/assets/icons/icon.svg";
import GreenDot from "@/shared/assets/icons/Ellipse 8.svg";
import RedDot from "@/shared/assets/icons/Ellipse 9.svg";
import Pagination from "@/shared/components/ui/Pagination";
import Pen from "@/shared/assets/icons/pen.svg";
import Scissors from "@/shared/assets/icons/scissors.svg";
import Trash from "@/shared/assets/icons/delete.svg";
import CreateAgentModal from "@/features/agents/components/CreateAgentModal";
import ConfirmAgentModal from "@/features/agents/components/ConfirmAgentModal";
import CreateAgentSucessModal from "@/features/agents/components/CreateAgentSucessModal";
import EditAgentModal from "@/features/agents/components/EditAgentModal";

const AgentsPage: React.FC = () => {
  const {
    agents,
    pagination,
    isLoading,
    fetchAgents,
    createAgent,
    updateAgent,
    deactivateAgent,
    deleteAgent,
  } = useAgentStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateAgentModal, setShowCreateAgentModal] = useState(false);
  const [showConfirmAgentModal, setShowConfirmAgentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pendingAgent, setPendingAgent] = useState<Pick<
    AgentProfile,
    "firstName" | "lastName" | "email"
  > | null>(null);
  const [editingAgent, setEditingAgent] = useState<AgentProfile | null>(null);
  const [confirming, setConfirming] = useState<{
    type: "deactivate" | "delete";
    agent: AgentProfile;
  } | null>(null);

  useEffect(() => {
    fetchAgents(1, 10);
  }, [fetchAgents]);

  const filteredAgents = agents.filter((agent) =>
    `${agent.firstName} ${agent.lastName} ${agent.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleAgentSubmit = (data: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    const newAgentData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    };
    setPendingAgent(newAgentData);
    setShowCreateAgentModal(false);
    setShowConfirmAgentModal(true);
  };

  const handleConfirm = async () => {
    if (pendingAgent) {
      await createAgent(pendingAgent);
      setShowConfirmAgentModal(false);
      setShowSuccessModal(true);
    }
  };

  const handleEditAgent = async (updatedAgent: AgentProfile) => {
    await updateAgent(updatedAgent.id, updatedAgent);
    setEditingAgent(null);
  };

  const handleDeactivateAgent = async (id: string) => {
    await deactivateAgent(id);
  };

  const handleDeleteAgent = async (id: string) => {
    await deleteAgent(id);
  };

  const handlePageChange = (page: number) => {
    fetchAgents(page, pagination.limit);
  };

  return (
    <div className="page-container">
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
      <div className="overflow-y-auto mt-6 max-h-[500px] mb-5">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 text-left sticky top-0">
            <tr>
              <th className="px-2 py-1">
                <div className="flex items-center gap-0">
                  <img src={PersonIcon} className="h-4" alt="Person" />
                </div>
              </th>
              <th className="px-4 py-1 min-w-[150px]">Full Name</th>
              <th className="px-0 py-1 min-w-[200px]">
                <div className="flex items-center gap-1">
                  <img src={EmailIcon} className="h-4" alt="Email" />
                  <span>Email</span>
                </div>
              </th>
              <th className="px-0 py-1 min-w-[100px]">Status</th>
              <th className="px-4 py-1 min-w-[250px]">
                <div className="flex items-center gap-1">
                  <img src={ActionIcon} className="h-4" alt="Actions" />
                  <span>Actions</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : filteredAgents.length > 0 ? (
              filteredAgents.map((agent) => (
                <tr key={agent.id} className="border-t">
                  <td className="px-0 py-1">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-white">
                      {agent.firstName[0]}
                    </div>
                  </td>
                  <td className="px-4 py-1">{`${agent.firstName} ${agent.lastName}`}</td>
                  <td className="px-0 py-1">{agent.email}</td>
                  <td className="px-0 py-1">
                    <div className="flex items-center gap-1">
                      <img
                        src={agent.status === "Active" ? GreenDot : RedDot}
                        className="h-3"
                        alt={agent.status}
                      />
                      {agent.status}
                    </div>
                  </td>
                  <td className="px-4 py-1">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setEditingAgent(agent)}
                        className="flex items-center gap-1 bg-gray-300 rounded px-2 py-1 text-xs"
                      >
                        Edit <img src={Pen} className="h-3" alt="Edit" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setConfirming({ type: "deactivate", agent })
                        }
                        className="flex items-center gap-1 bg-red-100 rounded px-2 py-1 text-xs"
                      >
                        Deactivate{" "}
                        <img src={Scissors} className="h-3" alt="Deactivate" />
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
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No agents found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />

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
      {showSuccessModal && (
        <CreateAgentSucessModal
          onClose={() => setShowSuccessModal(false)}
          id="new"
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
