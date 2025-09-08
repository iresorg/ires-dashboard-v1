import React, { useEffect, useState, useCallback, useRef } from "react";
import { useAgents } from "@/features/agents/hooks";
import type { AgentProfile } from "@/features/agents/services/agentService";
import { useDebounce } from "@/shared/hooks";
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
import { UserTableSkeletonRow } from "@/shared/components/ui";

const AgentsPage: React.FC = () => {
  const {
    agents,
    pagination,
    isLoading,
    search,
    fetchAgents,
    setSearch,
    createAgent,
    updateAgent,
    deactivateAgent,
    activateAgent,
    deleteAgent,
  } = useAgents();

  // Debounce search query to avoid too many API calls
  const debouncedSearch = useDebounce(search, 500);
  const [showCreateAgentModal, setShowCreateAgentModal] = useState(false);
  const [showConfirmAgentModal, setShowConfirmAgentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pendingAgent, setPendingAgent] = useState<Pick<
    AgentProfile,
    "firstName" | "lastName" | "email"
  > | null>(null);
  const [editingAgent, setEditingAgent] = useState<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: string;
    avatar?: string;
    avatarFile?: File | null;
    createdAt: string;
    updatedAt: string;
    lastLogin: string | null;
  } | null>(null);
  const [confirming, setConfirming] = useState<{
    type: "deactivate" | "activate" | "delete";
    agent: AgentProfile;
  } | null>(null);

  // Track if we've made the initial fetch
  const hasInitialized = useRef(false);
  const lastSearchRef = useRef(debouncedSearch);

  // Single effect to handle both initial load and search
  useEffect(() => {
    const isInitialLoad = !hasInitialized.current;
    const isSearchChange = lastSearchRef.current !== debouncedSearch;

    if (isInitialLoad) {
      hasInitialized.current = true;
      lastSearchRef.current = debouncedSearch;
      fetchAgents(1, 10);
    } else if (isSearchChange) {
      lastSearchRef.current = debouncedSearch;
      fetchAgents(1, pagination.limit, debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, pagination.limit]); // Remove fetchAgents from dependencies

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
      // Refresh agents list after creating
      await fetchAgents(pagination.page, pagination.limit, debouncedSearch);
    }
  };

  const handleEditAgent = async (updatedAgent: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: string;
    avatar?: string;
    avatarFile?: File | null;
    createdAt: string;
    updatedAt: string;
    lastLogin: string | null;
  }) => {
    await updateAgent(updatedAgent.id, {
      firstName: updatedAgent.firstName,
      lastName: updatedAgent.lastName,
      email: updatedAgent.email,
      avatarFile: updatedAgent.avatarFile,
    });
    setEditingAgent(null);
    // Refresh agents list after editing
    await fetchAgents(pagination.page, pagination.limit, debouncedSearch);
  };

  const handleDeactivateAgent = async (id: string) => {
    await deactivateAgent(id);
    // Refresh agents list after deactivating
    await fetchAgents(pagination.page, pagination.limit, debouncedSearch);
  };

  const handleActivateAgent = async (id: string) => {
    await activateAgent(id);
    // Refresh agents list after activating
    await fetchAgents(pagination.page, pagination.limit, debouncedSearch);
  };

  const handleDeleteAgent = async (id: string) => {
    await deleteAgent(id);
    // Refresh agents list after deleting
    await fetchAgents(pagination.page, pagination.limit, debouncedSearch);
  };

  const handlePageChange = useCallback((page: number) => {
    fetchAgents(page, pagination.limit, debouncedSearch);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [fetchAgents, pagination.limit, debouncedSearch]);

  return (
    <div className="page-container">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <button
          type="button"
          onClick={() => setShowCreateAgentModal(true)}
          className="flex flex-col items-center justify-center px-6 py-3 bg-[var(--ires-dark-blue)] text-white rounded-lg hover:bg-[var(--ires-navy-blue)] cursor-pointer"
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
              <>
                {Array.from({ length: 10 }).map((_, idx) => (
                  <UserTableSkeletonRow key={idx} />
                ))}
              </>
            ) : agents && agents.length > 0 ? (
              agents.map((agent) => {
                // Debug: Log agent data to see structure
                console.log('Agent data:', agent);
                return (
                  <tr key={agent.id} className="border-t">
                    <td className="px-0 py-1">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-white overflow-hidden">
                        {agent.avatar?.url ? (
                          <img
                            src={agent.avatar.url}
                            alt={`${agent.firstName} ${agent.lastName}`}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          agent.firstName?.[0] || '?'
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-1">{`${agent.firstName || ''} ${agent.lastName || ''}`}</td>
                    <td className="px-0 py-1">{agent.email || ''}</td>
                    <td className="px-0 py-1">
                      <div className="flex items-center gap-1">
                        <img
                          src={agent.status?.toLowerCase() === "active" ? GreenDot : RedDot}
                          className="h-3"
                          alt={agent.status || 'Unknown'}
                        />
                        {agent.status || 'Unknown'}
                      </div>
                    </td>
                    <td className="px-4 py-1">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                        onClick={() => {
                          setEditingAgent({
                            ...agent,
                            avatar: agent.avatar?.url || undefined,
                            avatarFile: null,
                          });
                        }}
                          className="flex items-center gap-1 bg-gray-300 rounded px-2 py-1 text-xs cursor-pointer"
                        >
                          Edit <img src={Pen} className="h-3" alt="Edit" />
                        </button>
                      <button
                        type="button"
                        onClick={() =>
                          setConfirming({ 
                            type: agent.status?.toLowerCase() === "active" ? "deactivate" : "activate", 
                            agent 
                          })
                        }
                          className={`flex items-center gap-1 rounded px-2 py-1 text-xs cursor-pointer ${
                            agent.status?.toLowerCase() === "active" 
                              ? "bg-red-100" 
                              : "bg-green-100"
                          }`}
                      >
                        {agent.status?.toLowerCase() === "active" ? "Deactivate" : "Activate"}{" "}
                        <img src={Scissors} className="h-3" alt={agent.status?.toLowerCase() === "active" ? "Deactivate" : "Activate"} />
                      </button>
                        <button
                          type="button"
                          onClick={() => setConfirming({ type: "delete", agent })}
                          className="flex items-center gap-1 bg-red-100 rounded px-2 py-1 text-xs cursor-pointer"
                        >
                          <img src={Trash} className="h-3" alt="Delete" />
                        </button>

                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <img src={PersonIcon} className="h-8 w-8 text-gray-400" alt="No agents" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No agents found</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {search ? "Try adjusting your search terms" : "Get started by creating your first agent"}
                      </p>
                      {!search && (
                        <button
                          type="button"
                          onClick={() => setShowCreateAgentModal(true)}
                          className="inline-flex items-center px-4 py-2 bg-[var(--ires-dark-blue)] text-white text-sm font-medium rounded-lg hover:bg-[var(--ires-navy-blue)] transition-colors"
                        >
                          <img src={AddIcon} className="h-4 w-4 mr-2" alt="Add" />
                          Create First Agent
                        </button>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}

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
          onClose={() => setShowSuccessModal(false)}
          agentName={`${pendingAgent.firstName} ${pendingAgent.lastName}`}
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
            } else if (confirming.type === "activate") {
              handleActivateAgent(confirming.agent.id);
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
