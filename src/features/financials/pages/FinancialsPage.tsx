import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CloudDownload, RefreshCw } from "lucide-react";
import { useDebounce } from "@/shared/hooks";
import Dropdown from "@/shared/components/ui/Dropdown";
import DatePicker from "@/shared/components/ui/DatePicker";
import Pagination from "@/shared/components/ui/Pagination";
import { useToast } from "@/shared/components/ui/useToast";
import { ROUTES } from "@/shared/constants/routes";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Role } from "@/shared/types/roles";
import SearchIcon from "@/shared/assets/icons/lineicons_search-2.svg";
import RevenueChart from "../components/RevenueChart";
import {
  getFinancialsOverview,
  getFinancialsTransactions,
  getPaystackBalance,
  getPaystackSettlements,
  syncPaystackTransactions,
} from "../services/financialsService";
import {
  defaultOverviewRange,
  formatDateRange,
  formatDateTime,
  formatMoney,
  formatPaymentTypeLabel,
  formatTransactionStatus,
  getApiErrorMessage,
  type FinancialPaymentType,
  type FinancialsOverview,
  type FinancialTransaction,
  type PaystackBalanceItem,
  type PaystackSettlement,
  type TransactionStatus,
} from "../types";

const statusOptions = [
  { value: "", label: "All statuses" },
  { value: "success", label: "Success" },
  { value: "failed", label: "Failed" },
  { value: "pending", label: "Pending" },
];

const paymentTypeOptions = [
  { value: "", label: "All payment types" },
  { value: "subscription", label: "Subscription" },
  { value: "one_time", label: "Pay as you go" },
];

const statusBadgeClass = (status: string): string => {
  switch (status) {
    case "success":
      return "bg-green-100 text-green-800";
    case "failed":
      return "bg-red-100 text-red-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const SummaryCard: React.FC<{
  label: string;
  value: string;
  hint?: string;
  featured?: boolean;
}> = ({ label, value, hint, featured = false }) => (
  <div
    className={`ui-card px-5 py-4 ${
      featured ? "bg-[var(--ires-navy-blue)] text-white border-transparent" : ""
    }`}
  >
    <p
      className={`text-xs font-medium ${
        featured ? "text-white/70" : "text-[var(--muted)]"
      }`}
    >
      {label}
    </p>
    <p
      className={`mt-1 text-2xl font-semibold tracking-tight ${
        featured ? "text-white" : "text-[var(--ires-navy-blue)]"
      }`}
    >
      {value}
    </p>
    {hint && (
      <p className={`mt-1 text-xs ${featured ? "text-white/60" : "text-[var(--muted)]"}`}>
        {hint}
      </p>
    )}
  </div>
);

const FinancialsPage: React.FC = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();
  const canAccess =
    user?.role === Role.SUPER_ADMIN || user?.role === Role.ADMIN;

  const rangeDefaults = defaultOverviewRange();
  const [from, setFrom] = useState(rangeDefaults.from);
  const [to, setTo] = useState(rangeDefaults.to);
  const [months] = useState(6);

  const [overview, setOverview] = useState<FinancialsOverview | null>(null);
  const [overviewLoading, setOverviewLoading] = useState(true);
  const [overviewError, setOverviewError] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  const [txLoading, setTxLoading] = useState(true);
  const [txError, setTxError] = useState<string | null>(null);
  const [txPage, setTxPage] = useState(1);
  const [txTotalPages, setTxTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [status, setStatus] = useState<TransactionStatus | "">("");
  const [paymentType, setPaymentType] = useState<FinancialPaymentType | "">("");
  const [txFrom, setTxFrom] = useState("");
  const [txTo, setTxTo] = useState("");

  const [balances, setBalances] = useState<PaystackBalanceItem[]>([]);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(true);

  const [settlements, setSettlements] = useState<PaystackSettlement[]>([]);
  const [settlementsError, setSettlementsError] = useState<string | null>(null);
  const [settlementsLoading, setSettlementsLoading] = useState(true);
  const [settlementsPage, setSettlementsPage] = useState(1);
  const [settlementsTotalPages, setSettlementsTotalPages] = useState(1);

  const loadOverview = useCallback(async () => {
    setOverviewLoading(true);
    setOverviewError(null);
    try {
      const data = await getFinancialsOverview({ from, to, months });
      setOverview(data);
    } catch (err) {
      setOverviewError(getApiErrorMessage(err, "Could not load financial overview"));
      setOverview(null);
    } finally {
      setOverviewLoading(false);
    }
  }, [from, to, months]);

  const loadTransactions = useCallback(
    async (page = 1) => {
      setTxLoading(true);
      setTxError(null);
      try {
        const result = await getFinancialsTransactions({
          page,
          limit: 10,
          status,
          paymentType,
          search: debouncedSearch,
          ...(txFrom ? { from: txFrom } : {}),
          ...(txTo ? { to: txTo } : {}),
        });
        setTransactions(result.data);
        setTxPage(result.page || page);
        setTxTotalPages(Math.max(1, result.totalPages || 1));
      } catch (err) {
        setTxError(getApiErrorMessage(err, "Could not load transactions"));
        setTransactions([]);
      } finally {
        setTxLoading(false);
      }
    },
    [status, paymentType, debouncedSearch, txFrom, txTo]
  );

  const loadPaystack = useCallback(async (page = 1) => {
    setBalanceLoading(true);
    setSettlementsLoading(true);
    setBalanceError(null);
    setSettlementsError(null);

    const [balanceResult, settlementsResult] = await Promise.allSettled([
      getPaystackBalance(),
      getPaystackSettlements({ page, perPage: 10 }),
    ]);

    if (balanceResult.status === "fulfilled") {
      setBalances(balanceResult.value.balances ?? []);
    } else {
      setBalances([]);
      setBalanceError(
        getApiErrorMessage(balanceResult.reason, "Could not load Paystack balance")
      );
    }
    setBalanceLoading(false);

    if (settlementsResult.status === "fulfilled") {
      const meta = settlementsResult.value.meta;
      setSettlements(settlementsResult.value.settlements ?? []);
      setSettlementsPage(meta?.page || page);
      const total = meta?.total ?? 0;
      const perPage = meta?.perPage || 10;
      setSettlementsTotalPages(Math.max(1, Math.ceil(total / perPage) || 1));
    } else {
      setSettlements([]);
      setSettlementsError(
        getApiErrorMessage(
          settlementsResult.reason,
          "Could not load Paystack settlements"
        )
      );
    }
    setSettlementsLoading(false);
  }, []);

  useEffect(() => {
    if (!canAccess) return;
    void loadOverview();
  }, [canAccess, loadOverview]);

  useEffect(() => {
    if (!canAccess) return;
    void loadTransactions(1);
  }, [canAccess, loadTransactions]);

  useEffect(() => {
    if (!canAccess) return;
    void loadPaystack(1);
  }, [canAccess, loadPaystack]);

  const handleSyncPaystack = async () => {
    setIsSyncing(true);
    try {
      const result = await syncPaystackTransactions({ from, to });
      const imported = result.imported ?? 0;
      const updated = result.updated ?? 0;
      const skipped = result.skipped ?? 0;
      showSuccess(
        "Synced from Paystack",
        result.message ||
          `Imported ${imported}, updated ${updated}, skipped ${skipped}.`
      );
      if (result.errors?.length) {
        showError("Some rows skipped", result.errors.slice(0, 2).join(" · "));
      }
      await Promise.all([loadOverview(), loadTransactions(1)]);
    } catch (err) {
      showError(
        "Sync failed",
        getApiErrorMessage(err, "Could not sync Paystack into the local ledger")
      );
    } finally {
      setIsSyncing(false);
    }
  };

  if (!canAccess) {
    return (
      <div className="ui-card px-5 py-8 text-center">
        <h2 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
          Financials
        </h2>
        <p className="text-sm text-[var(--muted)] mt-2">
          Only admins can view financials.
        </p>
      </div>
    );
  }

  const summary = overview?.summary;
  const currency = overview?.currency || "NGN";

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="ui-toolbar items-start">
        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-[var(--ires-navy-blue)]">
            Financials
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Revenue from the local payment ledger · Paystack for wallet &amp; settlements
          </p>
        </div>
        <div className="ml-auto flex flex-wrap items-end justify-end gap-2">
          <DatePicker label="From" value={from} onChange={setFrom} />
          <DatePicker label="To" value={to} onChange={setTo} />
          <button
            type="button"
            className="ui-action-btn h-10 px-3 inline-flex items-center gap-1.5"
            onClick={() => void handleSyncPaystack()}
            disabled={isSyncing}
          >
            <CloudDownload className="h-4 w-4" />
            {isSyncing ? "Syncing…" : "Sync from Paystack"}
          </button>
          <button type="button" className="ui-btn-primary h-10" onClick={() => void loadOverview()}>
            Apply
          </button>
        </div>
      </div>

      {overviewError && (
        <div className="ui-card px-4 py-3 text-sm text-[var(--ires-red)] flex items-center justify-between gap-3">
          <span>{overviewError}</span>
          <button type="button" className="ui-action-btn" onClick={() => void loadOverview()}>
            Retry
          </button>
        </div>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <SummaryCard
          featured
          label="Total revenue"
          value={overviewLoading ? "…" : formatMoney(summary?.revenueTotal ?? 0, currency)}
          hint={
            overview?.range
              ? `Local ledger · ${formatDateRange(overview.range.from, overview.range.to)}`
              : "Local ledger"
          }
        />
        <SummaryCard
          label="Subscription"
          value={
            overviewLoading ? "…" : formatMoney(summary?.revenueSubscription ?? 0, currency)
          }
        />
        <SummaryCard
          label="Pay as you go"
          value={overviewLoading ? "…" : formatMoney(summary?.revenuePayg ?? 0, currency)}
        />
        <SummaryCard
          label="MRR (approx)"
          value={overviewLoading ? "…" : formatMoney(summary?.mrr ?? 0, currency)}
          hint="Active plan prices · no proration"
        />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <SummaryCard
          label="Successful"
          value={overviewLoading ? "…" : String(summary?.successCount ?? 0)}
        />
        <SummaryCard
          label="Failed"
          value={overviewLoading ? "…" : String(summary?.failedCount ?? 0)}
        />
        <SummaryCard
          label="Pending"
          value={overviewLoading ? "…" : String(summary?.pendingCount ?? 0)}
        />
        <SummaryCard
          label="Active subscribers"
          value={overviewLoading ? "…" : String(summary?.activeSubscribers ?? 0)}
          hint={
            overviewLoading
              ? undefined
              : `${summary?.paygCreditsAvailable ?? 0} unused PAYG credits`
          }
        />
      </section>

      <RevenueChart
        points={overview?.revenueByMonth ?? []}
        isLoading={overviewLoading}
        currency={currency}
      />

      <section className="ui-card overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <h3 className="text-base font-semibold text-[var(--ires-navy-blue)]">
            Payment ledger
          </h3>
          <p className="text-xs text-[var(--muted)] mt-0.5">
            Local subscription transactions — search by email, name, or reference
          </p>
        </div>

        <div className="px-5 py-4 flex flex-wrap gap-3 items-center">
          <div className="ui-search flex-1 min-w-[16rem] max-w-md">
            <img src={SearchIcon} alt="" className="h-4 mr-2 opacity-60 shrink-0" />
            <input
              placeholder="Search email, name, or reference"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-40">
            <Dropdown
              options={statusOptions}
              value={status}
              onChange={(value) => setStatus(value as TransactionStatus | "")}
              placeholder="Status"
            />
          </div>
          <div className="w-full sm:w-48">
            <Dropdown
              options={paymentTypeOptions}
              value={paymentType}
              onChange={(value) => setPaymentType(value as FinancialPaymentType | "")}
              placeholder="Payment type"
            />
          </div>
          <DatePicker
            value={txFrom}
            onChange={setTxFrom}
            placeholder="From date"
            allowClear
          />
          <DatePicker
            value={txTo}
            onChange={setTxTo}
            placeholder="To date"
            allowClear
          />
        </div>

        {txError && (
          <div className="mx-5 mb-3 ui-card px-4 py-3 text-sm text-[var(--ires-red)] flex items-center justify-between gap-3">
            <span>{txError}</span>
            <button
              type="button"
              className="ui-action-btn"
              onClick={() => void loadTransactions(txPage)}
            >
              Retry
            </button>
          </div>
        )}

        <div className="ui-table-wrap border-0 rounded-none shadow-none">
          <table className="ui-table" style={{ minWidth: "1100px" }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Plan</th>
                <th>Type</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              {txLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={7}>
                      <div className="h-8 rounded bg-[var(--cool-blue-tint)]/60 animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-[var(--muted)]">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="text-[var(--muted)] whitespace-nowrap">
                      {formatDateTime(tx.createdAt)}
                    </td>
                    <td>
                      <div className="font-medium text-[var(--ires-navy-blue)]">
                        {tx.accountName || "—"}
                      </div>
                      <div className="text-xs text-[var(--muted)]">
                        {tx.accountEmail || "—"}
                      </div>
                      {tx.accountId && (
                        <Link
                          to={ROUTES.CTA_SUBSCRIBERS}
                          className="text-xs text-[var(--ires-navy-blue)] hover:underline"
                        >
                          View subscribers
                        </Link>
                      )}
                    </td>
                    <td>{tx.planName || "—"}</td>
                    <td>{formatPaymentTypeLabel(tx.paymentType)}</td>
                    <td>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadgeClass(
                          String(tx.status)
                        )}`}
                      >
                        {formatTransactionStatus(tx.status)}
                      </span>
                    </td>
                    <td className="font-medium whitespace-nowrap">
                      {formatMoney(tx.amount, tx.currency || currency)}
                    </td>
                    <td className="font-mono text-xs">{tx.reference || "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4 border-t border-[var(--border)]">
          <Pagination
            currentPage={txPage}
            totalPages={txTotalPages}
            onPageChange={(page) => void loadTransactions(page)}
            scrollToTop={false}
          />
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-[var(--ires-navy-blue)]">
            Paystack wallet
          </h3>
          <p className="text-xs text-[var(--muted)] mt-0.5">
            Live balance and bank settlements — not the same as period revenue above
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="ui-card px-5 py-4 lg:col-span-1">
            <p className="text-xs font-medium text-[var(--muted)]">Available in Paystack</p>
            {balanceLoading ? (
              <div className="mt-3 h-10 rounded bg-[var(--cool-blue-tint)]/60 animate-pulse" />
            ) : balanceError ? (
              <div className="mt-3 space-y-2">
                <p className="text-sm text-[var(--ires-red)]">{balanceError}</p>
                <button
                  type="button"
                  className="ui-action-btn"
                  onClick={() => void loadPaystack(settlementsPage)}
                >
                  Retry
                </button>
              </div>
            ) : balances.length === 0 ? (
              <p className="mt-2 text-sm text-[var(--muted)]">No balance returned.</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {balances.map((item) => (
                  <li key={item.currency}>
                    <p className="text-2xl font-semibold text-[var(--ires-navy-blue)]">
                      {typeof item.balanceNaira === "number"
                        ? formatMoney(item.balanceNaira * 100, item.currency)
                        : formatMoney(item.balance, item.currency)}
                    </p>
                    <p className="text-xs text-[var(--muted)]">{item.currency}</p>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-xs text-[var(--muted)]">
              May lag settlements; not the same as recorded revenue.
            </p>
          </div>

          <div className="ui-card overflow-hidden lg:col-span-2">
            <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-semibold text-[var(--ires-navy-blue)]">
                  Money to bank
                </h4>
                <p className="text-xs text-[var(--muted)]">Paystack settlements</p>
              </div>
              <button
                type="button"
                className="ui-action-btn h-9 px-3 inline-flex items-center gap-1.5"
                onClick={() => void loadPaystack(settlementsPage)}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Refresh
              </button>
            </div>

            {settlementsError && (
              <div className="m-4 ui-card px-4 py-3 text-sm text-[var(--ires-red)] flex items-center justify-between gap-3">
                <span>{settlementsError}</span>
                <button
                  type="button"
                  className="ui-action-btn"
                  onClick={() => void loadPaystack(settlementsPage)}
                >
                  Retry
                </button>
              </div>
            )}

            <div className="ui-table-wrap border-0 rounded-none shadow-none">
              <table className="ui-table" style={{ minWidth: "720px" }}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Effective</th>
                    <th>Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {settlementsLoading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <tr key={i}>
                        <td colSpan={5}>
                          <div className="h-8 rounded bg-[var(--cool-blue-tint)]/60 animate-pulse" />
                        </td>
                      </tr>
                    ))
                  ) : settlements.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-[var(--muted)]">
                        No settlements yet.
                      </td>
                    </tr>
                  ) : (
                    settlements.map((row) => (
                      <tr key={row.id}>
                        <td className="whitespace-nowrap">
                          {formatDateTime(row.settlementDate)}
                        </td>
                        <td>
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadgeClass(
                              String(row.status)
                            )}`}
                          >
                            {formatTransactionStatus(row.status)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap">
                          {typeof row.totalAmountNaira === "number"
                            ? formatMoney(row.totalAmountNaira * 100, row.currency)
                            : formatMoney(row.totalAmount, row.currency)}
                        </td>
                        <td className="whitespace-nowrap">
                          {formatMoney(row.effectiveAmount, row.currency)}
                        </td>
                        <td className="whitespace-nowrap text-[var(--muted)]">
                          {formatMoney(row.settlementFee, row.currency)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-4 border-t border-[var(--border)]">
              <Pagination
                currentPage={settlementsPage}
                totalPages={settlementsTotalPages}
                onPageChange={(page) => void loadPaystack(page)}
                scrollToTop={false}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinancialsPage;
