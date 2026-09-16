"use client";
import React, { useRef, useCallback } from "react";
import UserTable from "@/features/users/components/UserTable";
import AddAdminModal from "@/features/admin/components/AddAdminModal";
import AddAdminSuccessModal from "@/features/admin/components/AddAdminSuccessModal";
import EditAdminSuccessModal from "@/features/admin/EditAdminSucessModal";
import { useUsers } from "../hooks";
import Pagination from "@/shared/components/ui/Pagination";
import type { PaginationRef } from "@/shared/components/ui/Pagination";

import AddIcon from "@/shared/assets/icons/add.svg";
import SearchIcon from "@/shared/assets/icons/lineicons_search-2.svg";
import FilterIcon from "@/shared/assets/icons/uiw_filter.svg";

const UsersPage: React.FC = () => {
  const {
    // State
    pagination,
    isLoading,
    error,
    search,
    showAdd,
    showAddSuccess,
    showEditSuccess,
    submitted,
    
    // Actions
    setSearch,
    setShowAdd,
    setShowAddSuccess,
    setShowEditSuccess,
    
    // User operations
    fetchUsers,
    getUserById,
    createUser,
    editUser,
    deactivateUser,
    activateUser,
    deleteUser,
    
    // Computed
    filteredUsers,
  } = useUsers();
  
  const tableRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<PaginationRef>(null);

  // Memoize handlePageChange to prevent unnecessary re-renders
  const handlePageChange = useCallback((page: number) => {
    fetchUsers(page, pagination.limit);
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchUsers, pagination.limit]);

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
          className="flex flex-col items-center bg-[var(--ires-dark-blue)] text-white px-4 py-3 rounded-lg -mt-5 cursor-pointer"
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
        users={filteredUsers}
        onEditUser={editUser}
        onDeactivateUser={deactivateUser}
        onActivateUser={activateUser}
        onDeleteUser={deleteUser}
        getUserById={getUserById}
        isLoading={isLoading}
      />

      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          className="mt-8"
          onRef={(ref) => {
            if (ref) {
              paginationRef.current = ref;
            }
          }}
        />
      )}

      {showAdd && (
        <AddAdminModal
          onClose={() => setShowAdd(false)}
          onAddAdmin={createUser}
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