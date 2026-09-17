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
    <div className="h-full flex flex-col gap-4" ref={tableRef}>
      <div className="ui-toolbar">
        <button
          onClick={() => setShowAdd(true)}
          className="ui-btn-primary"
        >
          <img src={AddIcon} className="h-4" />
          Add admin
        </button>

        <div className="flex gap-3">
          <div className="ui-search">
            <img src={SearchIcon} className="h-4 mr-2 opacity-60" />
            <input
              placeholder="Search name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="ui-search min-w-[12rem]">
            <img src={FilterIcon} className="h-4 mr-2 opacity-60" />
            <select className="bg-transparent outline-none text-sm w-full">
              <option>All roles</option>
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