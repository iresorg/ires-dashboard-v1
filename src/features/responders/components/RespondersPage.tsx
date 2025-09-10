import React, { useEffect, useState } from "react";
import AddIcon from "@/shared/assets/icons/add.svg";
import Search from "@/shared/assets/icons/lineicons_search-2.svg";
import Filter from "@/shared/assets/icons/uiw_filter.svg";
import ActionIcon from "@/shared/assets/icons/actions.svg";
import GreenButton from "@/shared/assets/icons/Ellipse 8.svg";
import RedDot from "@/shared/assets/icons/Ellipse 9.png";
import Pagination from "@/shared/components/ui/Pagination";
import Email from "@/shared/assets/icons/icon.svg";
import Pen from "@/shared/assets/icons/pen.svg";
import Scissors from "@/shared/assets/icons/scissors.svg";
import ResponderIcon from "@/shared/assets/icons/respondericon.svg";
import Trash from "@/shared/assets/icons/delete.svg";
import ProfileImage from "@/shared/assets/images/profile.png";

import CreateResponderModal from "@/features/responders/components/CreateResponderModal";
import CreateResponderSucessModal from "@/features/responders/components/CreateResponderSucessModal";
import EditResponderModal from "@/features/responders/components/EditResponderModal";
import ConfirmResponderModal from "@/features/responders/components/ConfirmResponderModal";
import { useRespondersStore } from "@/features/responders/store/respondersStore";
import type { Responder } from "@/features/responders/services/respondersService";

const RespondersPage: React.FC = () => {
  const {
    responders,
    addResponder,
    fetchResponders,
    updateResponder,
    deleteResponder,
    loading,
    error,
  } = useRespondersStore();

  // local UI state
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateResponderModal, setShowCreateResponderModal] =
    useState(false);
  const [showCreateSuccessModal, setShowCreateSuccessModal] = useState(false);
  const [submittedResponder, setSubmittedResponder] = useState<{
    id: string;
    tier: string;
  } | null>(null);
  const [editingResponder, setEditingResponder] = useState<Responder | null>(
    null
  );
  const [confirming, setConfirming] = useState<{
    type: "deactivate" | "delete";
    responder: Responder;
  } | null>(null);

  // pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const respondersPerPage = 4;

  // fetch list on mount
  useEffect(() => {
    fetchResponders();
  }, [fetchResponders]);

  // filtering & pagination
  const filteredResponders = responders.filter((responder) =>
    `${responder.firstName} ${responder.lastName} ${responder.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredResponders.length / respondersPerPage)
  );
  const indexOfLastResponder = currentPage * respondersPerPage;
  const indexOfFirstResponder = indexOfLastResponder - respondersPerPage;
  const currentResponders = filteredResponders.slice(
    indexOfFirstResponder,
    indexOfLastResponder
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // ---------- Create ----------
  const handleCreateResponder = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    tier: string;
    avatar?: string;
  }) => {
    try {
      await addResponder({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        tier: data.tier as "Tier1" | "Tier2",
        status: "Active",
        avatarUrl: data.avatar,
      });
      // store.addResponder doesn't return id; show temp success info
      setSubmittedResponder({ id: "new", tier: data.tier });
      setShowCreateResponderModal(false);
      setShowCreateSuccessModal(true);
      setCurrentPage(1);
    } catch (err) {
      console.error("Failed to create responder:", err);
      // optionally show toast / error UI
    }
  };

  // ---------- Edit / Deactivate / Delete ----------
  const handleEditResponder = async (updated: Responder) => {
    try {
      await updateResponder(updated.id, updated);
      setEditingResponder(null);
    } catch (err) {
      console.error("Failed to update responder:", err);
    }
  };

  const handleDeactivateResponder = async (id: string) => {
    try {
      await updateResponder(id, { status: "Inactive" });
    } catch (err) {
      console.error("Failed to deactivate responder:", err);
    }
  };

  const handleDeleteResponder = async (id: string) => {
    try {
      await deleteResponder(id);
      if (currentResponders.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error("Failed to delete responder:", err);
    }
  };

  return (
    <div className="">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <button
          type="button"
          className="flex flex-col items-center justify-center px-6 py-3 bg-[var(--ires-dark-blue)] text-white rounded-lg hover:bg-[var(--ires-navy-blue)]"
          onClick={() => setShowCreateResponderModal(true)}
        >
          <img src={AddIcon} alt="Add Responder" className="h-5 mb-1" />
          <span className="text-sm font-semibold">Create New Responder</span>
        </button>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center bg-[#D9D9D9] rounded-sm px-4 h-12 w-64">
            <img src={Search} className="h-5 mr-2" alt="Search" />
            <input
              type="text"
              placeholder="Search Name/Email"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
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
                Filter by Tier
              </option>
              <option value="Tier1">Tier 1</option>
              <option value="Tier2">Tier 2</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto mt-6 mb-5">
        {loading && (
          // skeleton rows while loading
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-0 py-1">
                  <div className="flex items-center gap-2">
                    <img src={ResponderIcon} className="w-6 h-6" alt="person" />
                  </div>
                </th>
                <th className="px-4 py-1">Full Name</th>
                <th className="px-4 py-1">
                  <div className="flex items-center gap-1">
                    <img src={Email} className="h-4" alt="email" />
                    <span>Email</span>
                  </div>
                </th>
                <th className="px-4 py-1 pl-6">Tier</th>
                <th className="px-4 py-1">Status</th>
                <th className="px-4 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 4 }).map((_, idx) => (
                <tr key={idx} className="border-t animate-pulse">
                  <td className="px-0 py-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300" />
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-4 w-24 bg-gray-300 rounded" />
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-4 w-32 bg-gray-300 rounded" />
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-4 w-20 bg-gray-300 rounded" />
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-4 w-12 bg-gray-300 rounded" />
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-4 w-20 bg-gray-300 rounded" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && (
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-0 py-1">
                  <div className="flex items-center gap-2">
                    <img src={ResponderIcon} className="w-6 h-6" alt="person" />
                  </div>
                </th>
                <th className="px-4 py-1">Full Name</th>
                <th className="px-4 py-1">
                  <div className="flex items-center gap-1">
                    <img src={Email} className="h-4" alt="email" />
                    <span>Email</span>
                  </div>
                </th>
                <th className="px-4 py-1 pl-6">Tier</th>
                <th className="px-4 py-1">Status</th>
                <th className="px-4 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {error ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : currentResponders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-600">
                    No responders found
                  </td>
                </tr>
              ) : (
                currentResponders.map((responder) => (
                  <tr key={responder.id} className="border-t whitespace-nowrap">
                    <td className="px-0 py-1">
                      <div className="flex items-center justify-start">
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-white overflow-hidden">
                          <img
                            src={ProfileImage}
                            alt={`${responder.firstName} ${responder.lastName}`}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-1">
                      {responder.firstName} {responder.lastName}
                    </td>
                    <td className="px-4 py-1">{responder.email}</td>
                    <td className="px-4 py-1">
                      <span
                        className={`text-[#000000] px-2 py-1 rounded-lg ${
                          responder.tier === "Tier2"
                            ? "bg-[#D00F24]/32"
                            : responder.tier === "Tier1"
                            ? "bg-[#0C0E5D]/30"
                            : "bg-gray-500"
                        }`}
                      >
                        {responder.tier}
                      </span>
                    </td>
                    <td className="px-4 py-1">
                      <div className="flex items-center gap-1">
                        <img
                          src={
                            responder.status === "Active" ? GreenButton : RedDot
                          }
                          className="h-3"
                          alt={responder.status}
                        />
                        {responder.status}
                      </div>
                    </td>
                    <td className="px-4 py-1 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          className="flex items-center gap-1 bg-gray-300 rounded px-2 py-1 text-xs"
                        >
                          <img
                            src={ActionIcon}
                            alt="View Details"
                            className="h-4"
                          />
                          View Details
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingResponder(responder)}
                          className="flex items-center gap-1 bg-gray-300 rounded px-2 py-1 text-xs"
                        >
                          Edit <img src={Pen} className="h-3" alt="Edit" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setConfirming({ type: "deactivate", responder })
                          }
                          className="flex items-center gap-1 bg-red-100 rounded px-2 py-1 text-xs"
                        >
                          Deactivate{" "}
                          <img
                            src={Scissors}
                            className="h-3"
                            alt="Deactivate"
                          />
                        </button>
                        <img
                          src={Trash}
                          onClick={() =>
                            setConfirming({ type: "delete", responder })
                          }
                          className="h-4 cursor-pointer"
                          alt="delete"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && !error && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
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
          tier={submittedResponder.tier}
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
          onConfirm={async () => {
            if (confirming.type === "deactivate") {
              await handleDeactivateResponder(confirming.responder.id);
            } else {
              await handleDeleteResponder(confirming.responder.id);
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
