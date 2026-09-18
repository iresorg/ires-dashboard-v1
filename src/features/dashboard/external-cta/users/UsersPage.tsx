"use client";

import { useEffect, useRef } from "react";
import { useDebounce } from "@/shared/hooks";
import { useExternalUsers } from "@/features/dashboard/external-cta/lib/hooks";
import ExternalUserTableSkeleton from "@/features/dashboard/external-cta/lib/components/ExternalUserTableSkeleton";

import Search from "@/shared/assets/icons/lineicons_search-2.svg";
import Filter from "@/shared/assets/icons/uiw_filter.svg";

import Pagination from "@/shared/components/ui/Pagination";
import Dropdown from "@/shared/components/ui/Dropdown";

// Format date helper
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Format role for display
const formatRole = (role: string): string => {
  return role.charAt(0).toUpperCase() + role.slice(1);
};

export default function CTAUsersPage() {
  const {
    users,
    isLoading,
    error,
    pagination,
    search,
    role,
    emailVerified,
    setSearch,
    setRole,
    setEmailVerified,
    fetchUsers,
  } = useExternalUsers();

  const debouncedSearch = useDebounce(search, 500);
  const lastSearchRef = useRef(debouncedSearch);
  const lastRoleRef = useRef(role);
  const lastEmailVerifiedRef = useRef(emailVerified);
  const hasInitialized = useRef(false);

  // Handle debounced search and filter changes
  useEffect(() => {
    const isInitialLoad = !hasInitialized.current;
    const isSearchChange = lastSearchRef.current !== debouncedSearch;
    const isRoleChange = lastRoleRef.current !== role;
    const isEmailVerifiedChange = lastEmailVerifiedRef.current !== emailVerified;

    if (isInitialLoad) {
      hasInitialized.current = true;
      lastSearchRef.current = debouncedSearch;
      lastRoleRef.current = role;
      lastEmailVerifiedRef.current = emailVerified;
    } else if (isSearchChange || isRoleChange || isEmailVerifiedChange) {
      lastSearchRef.current = debouncedSearch;
      lastRoleRef.current = role;
      lastEmailVerifiedRef.current = emailVerified;
      // Reset to page 1 when filters change
      fetchUsers(1, pagination.limit);
    }
  }, [debouncedSearch, role, emailVerified, fetchUsers, pagination.limit]);

  const handlePageChange = (page: number) => {
    fetchUsers(page, pagination.limit);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const roleOptions = [
    { value: "", label: "All Roles" },
    { value: "individual", label: "Individual" },
    { value: "organization", label: "Organization" },
  ];

  const emailVerifiedOptions = [
    { value: "", label: "All Verification" },
    { value: "verified", label: "Verified" },
    { value: "not_verified", label: "Not Verified" },
  ];

  return (
    <div className="w-full space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold text-[var(--ires-navy-blue)]">
            External users
          </h2>
          <p className="text-sm text-[var(--muted)]">
            View and manage all external user accounts
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="ui-search w-full min-w-0">
          <img src={Search} className="w-4 h-4 mr-2 opacity-60" alt="" />
          <input
            type="text"
            placeholder="Search name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Role Filter Dropdown */}
        <Dropdown
          options={roleOptions}
          value={role}
          onChange={(value) => setRole(value as "individual" | "organization" | "")}
          placeholder="All Roles"
          icon={<img src={Filter} className="w-4 h-4" alt="Filter" />}
        />

        {/* Email Verified Filter Dropdown */}
        <Dropdown
          options={emailVerifiedOptions}
          value={emailVerified}
          onChange={(value) => setEmailVerified(value as "verified" | "not_verified" | "")}
          placeholder="All Verification"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Table Container - Horizontal Scroll Only */}
      <div className="ui-table-wrap">
        <table className="ui-table" style={{ minWidth: '800px' }}>
          <thead>
            <tr>
              <th>User name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Email verified</th>
              <th>Phone number</th>
              <th>Joined date</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <ExternalUserTableSkeleton />
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-12 text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <p className="text-base font-medium">No users found</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {formatRole(user.role)}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${user.emailVerified
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                    >
                      {user.emailVerified ? "Verified" : "Not Verified"}
                    </span>
                  </td>

                  <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                    {user.phone}
                  </td>
                  <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                    {formatDate(user.joinedDate)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      {!isLoading && users.length > 0 && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{users.length}</span> of{" "}
            <span className="font-medium">{pagination.total}</span> users
          </div>
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
