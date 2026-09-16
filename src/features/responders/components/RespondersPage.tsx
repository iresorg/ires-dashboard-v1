import React, { useState, useEffect, useCallback, useRef } from "react";
import { useResponders } from "@/features/responders/hooks";
import type { ResponderProfile, CreateResponderData, UpdateResponderData } from "@/features/responders/services/respondersService";
import { useDebounce } from "@/shared/hooks";
import AddIcon from "@/shared/assets/icons/add.svg";
import Search from "@/shared/assets/icons/lineicons_search-2.svg";
import ActionIcon from "@/shared/assets/icons/actions.svg";
import GreenButton from "@/shared/assets/icons/Ellipse 8.svg";
import RedDot from "@/shared/assets/icons/Ellipse 9.png";
import Pagination from "@/shared/components/ui/Pagination";
import Email from "@/shared/assets/icons/icon.svg";
import Pen from "@/shared/assets/icons/pen.svg";
import Scissors from "@/shared/assets/icons/scissors.svg";
import Responder from "@/shared/assets/icons/respondericon.svg";
import Trash from "@/shared/assets/icons/delete.svg";
import CreateResponderModal from "@/features/responders/components/CreateResponderModal";
import CreateResponderSucessModal from "@/features/responders/components/CreateResponderSucessModal";
import EditResponderModal from "@/features/responders/components/EditResponderModal";
import ConfirmResponderModal from "@/features/responders/components/ConfirmResponderModal";
import { UserTableSkeletonRow } from "@/shared/components/ui";

const RespondersPage: React.FC = () => {
  const {
    responders,
    pagination,
    isLoading,
    search,
    fetchResponders,
    setSearch,
    createResponder,
    updateResponder,
    activateResponder,
    deactivateResponder,
    deleteResponder,
  } = useResponders();

  // Debounce search query to avoid too many API calls
  const debouncedSearch = useDebounce(search, 500);
  const [showCreateResponderModal, setShowCreateResponderModal] = useState(false);
  const [showCreateSuccessModal, setShowCreateSuccessModal] = useState(false);
  const [submittedResponder, setSubmittedResponder] = useState<{
    id: string;
    role: string;
  } | null>(null);
  const [editingResponder, setEditingResponder] = useState<ResponderProfile | null>(null);
  const [confirming, setConfirming] = useState<{
    type: "activate" | "deactivate" | "delete";
    responder: ResponderProfile;
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
      fetchResponders(1, 10);
    } else if (isSearchChange) {
      lastSearchRef.current = debouncedSearch;
      fetchResponders(1, pagination.limit, debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, pagination.limit]);

  const handlePageChange = useCallback((page: number) => {
    fetchResponders(page, pagination.limit, debouncedSearch);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [fetchResponders, pagination.limit, debouncedSearch]);

  const handleCreateResponder = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatar?: File;
  }) => {
    const newResponderData: CreateResponderData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role as "RESPONDER_TIER_1" | "RESPONDER_TIER_2",
      avatar: data.avatar,
    };
    await createResponder(newResponderData);
    setSubmittedResponder({
      id: "new", // We'll get the actual ID from the response
      role: data.role,
    });
    setShowCreateResponderModal(false);
    setShowCreateSuccessModal(true);
    // Refresh responders list after creating
    await fetchResponders(pagination.page, pagination.limit, debouncedSearch);
  };

  const handleEditResponder = async (updatedResponder: ResponderProfile & { avatarFile?: File | null }) => {
    const updateData: UpdateResponderData = {
      firstName: updatedResponder.firstName,
      lastName: updatedResponder.lastName,
      email: updatedResponder.email,
      role: updatedResponder.role,
      avatarFile: updatedResponder.avatarFile,
    };
    await updateResponder(updatedResponder.id, updateData);
    setEditingResponder(null);
    // Refresh responders list after editing
    await fetchResponders(pagination.page, pagination.limit, debouncedSearch);
  };

  const handleActivateResponder = async (id: string) => {
    await activateResponder(id);
    // Refresh responders list after activating
    await fetchResponders(pagination.page, pagination.limit, debouncedSearch);
  };

  const handleDeactivateResponder = async (id: string) => {
    await deactivateResponder(id);
    // Refresh responders list after deactivating
    await fetchResponders(pagination.page, pagination.limit, debouncedSearch);
  };

  const handleDeleteResponder = async (id: string) => {
    await deleteResponder(id);
    // Refresh responders list after deleting
    await fetchResponders(pagination.page, pagination.limit, debouncedSearch);
  };

  return (
    <div className="page-container">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <button
          type="button"
          onClick={() => setShowCreateResponderModal(true)}
          className="flex flex-col items-center justify-center px-6 py-3 bg-[var(--ires-dark-blue)] text-white rounded-lg hover:bg-[var(--ires-navy-blue)] cursor-pointer"
        >
          <img src={AddIcon} alt="Add Responder" className="h-5 mb-1" />
          <span className="text-sm font-semibold">Create Responder</span>
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
                  <img src={Responder} className="h-4" alt="Person" />
                </div>
              </th>
              <th className="px-4 py-1 min-w-[150px]">Full Name</th>
              <th className="px-0 py-1 min-w-[200px]">
                <div className="flex items-center gap-1">
                  <img src={Email} className="h-4" alt="Email" />
                  <span>Email</span>
                </div>
              </th>
              <th className="px-0 py-1 min-w-[100px]">Role</th>
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
            ) : responders && responders.length > 0 ? (
              responders.map((responder: ResponderProfile) => (
                <tr key={responder.id} className="border-t">
                <td className="px-0 py-1">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-white overflow-hidden">
                      {responder.avatar?.url ? (
                      <img
                          src={responder.avatar.url}
                        alt={`${responder.firstName} ${responder.lastName}`}
                          className="w-full h-full object-cover rounded-full"
                      />
                      ) : (
                        responder.firstName?.[0] || '?'
                      )}
                  </div>
                </td>
                  <td className="px-4 py-1">{`${responder.firstName || ''} ${responder.lastName || ''}`}</td>
                  <td className="px-0 py-1">{responder.email || ''}</td>
                  <td className="px-0 py-1">
                  <span
                    className={`text-[#000000] px-2 py-1 rounded-lg ${
                        responder.role === "RESPONDER_TIER_2"
                        ? "bg-[#D00F24]/32"
                          : responder.role === "RESPONDER_TIER_1"
                        ? "bg-[#0C0E5D]/30"
                        : "bg-gray-500"
                    }`}
                  >
                      {responder.role === "RESPONDER_TIER_1" ? "Tier 1" : "Tier 2"}
                  </span>
                </td>
                  <td className="px-0 py-1">
                  <div className="flex items-center gap-1">
                    <img
                        src={responder.status?.toLowerCase() === "active" ? GreenButton : RedDot}
                      className="h-3"
                        alt={responder.status || 'Unknown'}
                    />
                      {responder.status || 'Unknown'}
                  </div>
                </td>
                  <td className="px-4 py-1">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingResponder(responder)}
                        className="flex items-center gap-1 bg-gray-300 rounded px-2 py-1 text-xs cursor-pointer"
                    >
                      Edit <img src={Pen} className="h-3" alt="Edit" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                          setConfirming({ 
                            type: responder.status?.toLowerCase() === "active" ? "deactivate" : "activate", 
                            responder 
                          })
                        }
                        className={`flex items-center gap-1 rounded px-2 py-1 text-xs cursor-pointer ${
                          responder.status?.toLowerCase() === "active" 
                            ? "bg-red-100" 
                            : "bg-green-100"
                        }`}
                      >
                        {responder.status?.toLowerCase() === "active" ? "Deactivate" : "Activate"}{" "}
                        <img src={Scissors} className="h-3" alt={responder.status?.toLowerCase() === "active" ? "Deactivate" : "Activate"} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirming({ type: "delete", responder })}
                        className="flex items-center gap-1 bg-red-100 rounded px-2 py-1 text-xs cursor-pointer"
                      >
                        <img src={Trash} className="h-3" alt="Delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <img src={Responder} className="h-8 w-8 text-gray-400" alt="No responders" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No responders found</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {search ? "Try adjusting your search terms" : "Get started by creating your first responder"}
                      </p>
                      {!search && (
                        <button
                          type="button"
                          onClick={() => setShowCreateResponderModal(true)}
                          className="inline-flex items-center px-4 py-2 bg-[var(--ires-dark-blue)] text-white text-sm font-medium rounded-lg hover:bg-[var(--ires-navy-blue)] transition-colors"
                        >
                          <img src={AddIcon} className="h-4 w-4 mr-2" alt="Add" />
                          Create First Responder
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
      {showCreateResponderModal && (
        <CreateResponderModal
          onClose={() => setShowCreateResponderModal(false)}
          onCreateResponder={handleCreateResponder}
        />
      )}
      {showCreateSuccessModal && submittedResponder && (
        <CreateResponderSucessModal
          onClose={() => setShowCreateSuccessModal(false)}
          id={submittedResponder.id}
          role={submittedResponder.role}
        />
      )}
      {editingResponder && (
        <EditResponderModal
          responder={editingResponder}
          onClose={() => setEditingResponder(null)}
          onSave={handleEditResponder}
        />
      )}
      {confirming && (
        <ConfirmResponderModal
          type={confirming.type}
          responderName={`${confirming.responder.firstName} ${confirming.responder.lastName}`}
          onConfirm={() => {
            if (confirming.type === "deactivate") {
              handleDeactivateResponder(confirming.responder.id);
            } else if (confirming.type === "activate") {
              handleActivateResponder(confirming.responder.id);
            } else {
              handleDeleteResponder(confirming.responder.id);
            }
            setConfirming(null);
          }}
          onClose={() => setConfirming(null)}
        />
      )}
    </div>
  );
};

export default RespondersPage;
