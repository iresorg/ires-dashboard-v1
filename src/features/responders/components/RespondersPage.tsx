import React, { useState } from "react";
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
import Responder from "@/shared/assets/icons/respondericon.svg";
import Trash from "@/shared/assets/icons/delete.svg";
import ProfileImage from "@/shared/assets/images/profile.png";
import CreateResponderModal from "@/features/responders/components/CreateResponderModal";
import CreateResponderSucessModal from "@/features/responders/components/CreateResponderSucessModal";
import EditResponderModal from "@/features/responders/components/EditResponderModal";
import ConfirmResponderModal from "@/features/responders/components/ConfirmResponderModal";

interface Responder {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tier: "Tier1" | "Tier2";
  status: "Active" | "Inactive";
}

const initialResponders: Responder[] = [
  {
    id: "TIRSP2117J",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    tier: "Tier2",
    status: "Active",
  },
  {
    id: "TIRSP2123H",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    tier: "Tier1",
    status: "Inactive",
  },
  {
    id: "TIRSP2145G",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    tier: "Tier1",
    status: "Active",
  },
  {
    id: "TIRSP2109R",
    firstName: "Bob",
    lastName: "Williams",
    email: "bob.williams@example.com",
    tier: "Tier2",
    status: "Active",
  },
];

const RespondersPage: React.FC = () => {
  const [responders, setResponders] = useState<Responder[]>(initialResponders);
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
  const [currentPage, setCurrentPage] = useState(1);
  const respondersPerPage = 4;

  const filteredResponders = responders.filter((responder) =>
    `${responder.firstName} ${responder.lastName} ${responder.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredResponders.length / respondersPerPage);
  const indexOfLastResponder = currentPage * respondersPerPage;
  const indexOfFirstResponder = indexOfLastResponder - respondersPerPage;
  const currentResponders = filteredResponders.slice(
    indexOfFirstResponder,
    indexOfLastResponder
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreateResponder = (data: {
    firstName: string;
    lastName: string;
    tier: string;
  }) => {
    const newId = `TIRSP${Math.floor(Math.random() * 9000) + 1000}`;
    const newResponder: Responder = {
      id: newId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: `${data.firstName.toLowerCase()}.${data.lastName.toLowerCase()}@example.com`,
      tier: data.tier as "Tier1" | "Tier2",
      status: "Active",
    };
    setResponders((prev) => [newResponder, ...prev]);
    setSubmittedResponder({
      id: newId,
      tier: data.tier,
    });
    setShowCreateResponderModal(false);
    setShowCreateSuccessModal(true);
    setCurrentPage(1); // Reset to first page when adding a new responder
  };

  const handleEditResponder = (updatedResponder: Responder) => {
    setResponders((prev) =>
      prev.map((responder) =>
        responder.id === updatedResponder.id ? updatedResponder : responder
      )
    );
    setEditingResponder(null);
  };

  const handleDeactivateResponder = (id: string) => {
    setResponders((prev) =>
      prev.map((responder) =>
        responder.id === id ? { ...responder, status: "Inactive" } : responder
      )
    );
  };

  const handleDeleteResponder = (id: string) => {
    setResponders((prev) => prev.filter((responder) => responder.id !== id));
    // Adjust current page if necessary
    if (currentResponders.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-0 py-1">
                <div className="flex items-center gap-2">
                  <img src={Responder} className="w-6 h-6 " alt="person" />
                </div>
              </th>
              <th className="px-4 py-1">
                <div className="flex items-center gap-1">
                  <span>Full Name</span>
                </div>
              </th>
              <th className="px-4 py-1">
                <div className="flex items-center gap-1">
                  <img src={Email} className="h-4" alt="email" />
                  <span>Email</span>
                </div>
              </th>
              <th className="px-4 py-1 pl-6">
                <div className="flex items-center gap-1">
                  <span>Tier</span>
                </div>
              </th>
              <th className="px-4 py-1">
                <div className="flex items-center gap-1">
                  <img src={GreenButton} className="h-3" alt="status" />
                  <span>Status</span>
                </div>
              </th>
              <th className="px-4 py-1">
                <div className="flex items-center gap-1">
                  <img src={ActionIcon} className="h-4" alt="actions" />
                  <span>Actions</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentResponders.map((responder) => (
              <tr key={responder.id} className="border-t whitespace-nowrap ">
                <td className="px-0 py-1">
                  <div className="flex items-center justify-start ">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-white">
                      <img
                        src={ProfileImage}
                        alt={`${responder.firstName} ${responder.lastName}`}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-1">
                  <span>{`${responder.firstName} ${responder.lastName}`}</span>
                </td>{" "}
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
                      src={responder.status === "Active" ? GreenButton : RedDot}
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
                      <img src={Scissors} className="h-3" alt="Deactivate" />
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

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
          onSave={(updatedResponder) => {
            handleEditResponder(updatedResponder);
          }}
        />
      )}
      {confirming && (
        <ConfirmResponderModal
          type={confirming.type}
          responderName={`${confirming.responder.firstName} ${confirming.responder.lastName}`}
          onConfirm={() => {
            if (confirming.type === "deactivate") {
              handleDeactivateResponder(confirming.responder.id);
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
