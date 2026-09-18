"use client";

import { useEffect, useRef } from "react";
import { useDebounce } from "@/shared/hooks";
import { useSubscribers } from "@/features/dashboard/external-cta/lib/hooks";
import SubscriberTableSkeleton from "@/features/dashboard/external-cta/lib/components/SubscriberTableSkeleton";
import type {
  SubscriberPaymentType,
  SubscriberStatus,
} from "@/features/dashboard/external-cta/lib/types/subscriber";

import Search from "@/shared/assets/icons/lineicons_search-2.svg";
import Filter from "@/shared/assets/icons/uiw_filter.svg";

import Pagination from "@/shared/components/ui/Pagination";
import Dropdown from "@/shared/components/ui/Dropdown";

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatRole = (role: string): string => {
  return role.charAt(0).toUpperCase() + role.slice(1);
};

const formatStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ");
};

const formatPaymentType = (paymentType?: string | null): string => {
  if (paymentType === "one_time") return "Pay as you go";
  return "Subscription";
};

const formatAmount = (amount: number | string): string => {
  const numAmount = typeof amount === "number" ? amount : parseFloat(amount);
  if (Number.isNaN(numAmount)) return String(amount);
  const nairaAmount = numAmount / 100;
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(nairaAmount);
};

const getStatusBadgeClass = (status: string): string => {
  switch (status) {
    case "active":
    case "available":
      return "bg-green-100 text-green-800";
    case "expired":
      return "bg-red-100 text-red-800";
    case "cancelled":
      return "bg-gray-100 text-gray-800";
    case "past_due":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function CTASubscribersPage() {
  const {
    subscribers,
    isLoading,
    error,
    pagination,
    search,
    status,
    planId,
    paymentType,
    setSearch,
    setStatus,
    setPlanId,
    setPaymentType,
    fetchSubscribers,
  } = useSubscribers();

  const debouncedSearch = useDebounce(search, 500);
  const lastSearchRef = useRef(debouncedSearch);
  const lastStatusRef = useRef(status);
  const lastPlanIdRef = useRef(planId);
  const lastPaymentTypeRef = useRef(paymentType);
  const hasInitialized = useRef(false);

  useEffect(() => {
    const isInitialLoad = !hasInitialized.current;
    const isSearchChange = lastSearchRef.current !== debouncedSearch;
    const isStatusChange = lastStatusRef.current !== status;
    const isPlanIdChange = lastPlanIdRef.current !== planId;
    const isPaymentTypeChange = lastPaymentTypeRef.current !== paymentType;

    if (isInitialLoad) {
      hasInitialized.current = true;
      lastSearchRef.current = debouncedSearch;
      lastStatusRef.current = status;
      lastPlanIdRef.current = planId;
      lastPaymentTypeRef.current = paymentType;
    } else if (
      isSearchChange ||
      isStatusChange ||
      isPlanIdChange ||
      isPaymentTypeChange
    ) {
      lastSearchRef.current = debouncedSearch;
      lastStatusRef.current = status;
      lastPlanIdRef.current = planId;
      lastPaymentTypeRef.current = paymentType;
      fetchSubscribers(1, pagination.limit);
    }
  }, [
    debouncedSearch,
    status,
    planId,
    paymentType,
    fetchSubscribers,
    pagination.limit,
  ]);

  const handlePageChange = (page: number) => {
    fetchSubscribers(page, pagination.limit);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "available", label: "Available" },
    { value: "expired", label: "Expired" },
    { value: "cancelled", label: "Cancelled" },
    { value: "past_due", label: "Past Due" },
  ];

  const paymentTypeOptions = [
    { value: "subscription", label: "Subscription" },
    { value: "one_time", label: "Pay as you go" },
    { value: "", label: "All payment types" },
  ];

  const planIdOptions = [
    { value: "", label: "All Plans" },
  ];

  const showCreditsColumn = paymentType === "one_time" || paymentType === "";

  return (
    <div className="w-full space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-[var(--ires-navy-blue)]">
          Subscribers
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Recurring subscribers and pay-as-you-go customers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="ui-search w-full min-w-0">
          <img src={Search} className="w-4 h-4 mr-2 opacity-60" alt="" />
          <input
            type="text"
            placeholder="Search name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Dropdown
          options={paymentTypeOptions}
          value={paymentType}
          onChange={(value) =>
            setPaymentType(value as SubscriberPaymentType | "")
          }
          placeholder="Payment type"
          icon={<img src={Filter} className="w-4 h-4" alt="Filter" />}
        />

        <Dropdown
          options={statusOptions}
          value={status}
          onChange={(value) => setStatus(value as SubscriberStatus | "")}
          placeholder="All Status"
          icon={<img src={Filter} className="w-4 h-4" alt="Filter" />}
        />

        {planIdOptions.length > 1 && (
          <Dropdown
            options={planIdOptions}
            value={planId}
            onChange={(value) => setPlanId(value)}
            placeholder="All Plans"
          />
        )}
      </div>

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

      <div className="ui-table-wrap">
        <table className="ui-table" style={{ minWidth: showCreditsColumn ? "1100px" : "1000px" }}>
          <thead>
            <tr>
              <th>User name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Plan</th>
              <th>Payment</th>
              <th>Amount</th>
              {showCreditsColumn && <th>Credits</th>}
              <th>Start date</th>
              <th>End date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <SubscriberTableSkeleton showCredits={showCreditsColumn} />
            ) : subscribers.length === 0 ? (
              <tr>
                <td
                  colSpan={showCreditsColumn ? 10 : 9}
                  className="text-center p-12 text-gray-500"
                >
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
                    <p className="text-base font-medium">No subscribers found</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              subscribers.map((subscriber) => {
                const isPayg = subscriber.paymentType === "one_time";

                return (
                  <tr
                    key={subscriber.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {subscriber.userName}
                    </td>
                    <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                      {subscriber.email}
                    </td>
                    <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {formatRole(subscriber.role)}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                      <div>{subscriber.planSubscribedTo}</div>
                      {!isPayg && subscriber.interval && (
                        <div className="text-xs text-[var(--muted)] capitalize">
                          {subscriber.interval}
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                      {formatPaymentType(subscriber.paymentType)}
                    </td>
                    <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                      {formatAmount(subscriber.amount)}
                    </td>
                    {showCreditsColumn && (
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                        {isPayg
                          ? subscriber.paygCreditsAvailable ?? 0
                          : "—"}
                      </td>
                    )}
                    <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                      {formatDate(subscriber.startDate)}
                    </td>
                    <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                      {formatDate(subscriber.endDate)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusBadgeClass(
                          subscriber.status
                        )}`}
                      >
                        {formatStatus(subscriber.status)}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {!isLoading && subscribers.length > 0 && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{subscribers.length}</span> of{" "}
            <span className="font-medium">{pagination.total}</span> subscribers
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
