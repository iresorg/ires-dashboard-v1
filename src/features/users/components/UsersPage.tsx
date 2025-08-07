"use client";
import React, { useState, useEffect, useRef } from "react";
import UserTable from "@/features/users/components/UserTable";
import AddAdminModal from "@/features/admin/components/AddAdminModal";
import AddAdminSuccessModal from "@/features/admin/components/AddAdminSuccessModal";
import EditAdminSuccessModal from "@/features/admin/EditAdminSucessModal";
import type { User } from "@/features/admin/components/EditAdminModal";
import { useUserStore } from "../store/userStore";
import Pagination from "@/shared/components/ui/Pagination";

import AddIcon from "@/shared/assets/icons/add.svg";
import SearchIcon from "@/shared/assets/icons/lineicons_search-2.svg";
import FilterIcon from "@/shared/assets/icons/uiw_filter.svg";

const UsersPage: React.FC = () => {
  const { users, pagination, isLoading, error, fetchUsers } = useUserStore();
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [showEditSuccess, setShowEditSuccess] = useState(false);
  const [submitted, setSubmitted] = useState<{
    firstName: string;
    lastName: string;
    role: string;
  } | null>(null);
  
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchUsers(1, 10);
  }, [fetchUsers]);

  const handlePageChange = (page: number) => {
    fetchUsers(page, pagination.limit);
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addAdmin = (newAdmin: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }) => {
    // TODO: Implement API call to add user
    setSubmitted({
      firstName: newAdmin.firstName,
      lastName: newAdmin.lastName,
      role: newAdmin.role,
    });
    setShowAdd(false);
    setShowAddSuccess(true);
  };

  const editAdmin = (u: User) => {
    // TODO: Implement API call to edit user
    setSubmitted({
      firstName: u.firstName,
      lastName: u.lastName,
      role: u.role,
    });
    setShowEditSuccess(true);
  };

  const deactivateAdmin = (id: number) => {
    // TODO: Implement API call to deactivate user
    console.log('Deactivate user:', id);
  };

  const deleteAdmin = (id: number) => {
    // TODO: Implement API call to delete user
    console.log('Delete user:', id);
  };

  const filtered = users.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col pt-5" ref={tableRef}>
      <div className="flex justify-between">
        <button
          onClick={() => setShowAdd(true)}
          className="flex flex-col items-center bg-[var(--ires-dark-blue)] text-white px-4 py-3 rounded-lg -mt-5"
        >
          <img src={AddIcon} className="h-5 mb-1" />
          <span className="text-sm">Add New Admin</span>
        </button>

        <div className="flex gap-4">
          <div className="flex items-center bg-gray-200 rounded h-10 pl-5">
            <img src={SearchIcon} className="h-4 mr-2" />
            <input
              className="bg-transparent outline-none text-sm"
              placeholder="Search Name/Email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center bg-gray-200 rounded h-10 pl-5 pr-3">
            <img src={FilterIcon} className="h-4 mr-2" />
            <select className="bg-transparent outline-none text-sm opacity-50">
              <option>Filter by Role</option>
              <option>Super Admin</option>
              <option>Agent Admin</option>
              <option>Responder Admin</option>
            </select>
          </div>
        </div>
      </div>

      <UserTable
        users={filtered}
        onEditUser={editAdmin}
        onDeactivateUser={deactivateAdmin}
        onDeleteUser={deleteAdmin}
        isLoading={isLoading}
      />

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
        className="mt-8"
      />

      {showAdd && (
        <AddAdminModal
          onClose={() => setShowAdd(false)}
          onAddAdmin={addAdmin}
        />
      )}
      {showAddSuccess && submitted && (
        <AddAdminSuccessModal
          onClose={() => setShowAddSuccess(false)}
          {...submitted}
        />
      )}
      {showEditSuccess && submitted && (
        <EditAdminSuccessModal
          onClose={() => setShowEditSuccess(false)}
          {...submitted}
        />
      )}
    </div>
  );
};

export default UsersPage;