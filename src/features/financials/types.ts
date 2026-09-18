export type TransactionStatus = "success" | "failed" | "pending";
export type FinancialPaymentType = "subscription" | "one_time";

export interface FinancialTransaction {
  id: string;
  reference: string;
  status: TransactionStatus | string;
  amount: number;
  amountNaira?: number;
  currency: string;
  paymentType: FinancialPaymentType | string;
  paymentMethod?: string | null;
  accountId?: string | null;
  accountEmail?: string | null;
  accountName?: string | null;
  planId?: string | null;
  planName?: string | null;
  subscriptionId?: string | null;
  createdAt: string;
}

export interface FinancialsSummary {
  revenueTotal: number;
  revenueSubscription: number;
  revenuePayg: number;
  successCount: number;
  failedCount: number;
  pendingCount: number;
  mrr: number;
  activeSubscribers: number;
  paygCreditsAvailable: number;
}

export interface RevenueByMonth {
  month: string;
  subscription: number;
  payg: number;
  total: number;
}

export interface FinancialsLocalSnapshot {
  revenueTotal?: number;
  successCount?: number;
}

export interface PaystackPeriodReconcile {
  revenueTotal: number;
  successCount: number;
  gapVsLocal: number;
}

export interface FinancialsOverview {
  currency: string;
  range: { from: string; to: string };
  revenueSource?: string;
  note?: string;
  summary: FinancialsSummary;
  local?: FinancialsLocalSnapshot;
  paystackPeriod?: PaystackPeriodReconcile | null;
  paystackError?: string | null;
  revenueByMonth: RevenueByMonth[];
  recentTransactions: FinancialTransaction[];
}

export interface SyncPaystackParams {
  from?: string;
  to?: string;
}

export interface SyncPaystackResponse {
  from?: string;
  to?: string;
  imported: number;
  updated: number;
  skipped: number;
  errors?: string[];
  message?: string;
}

export interface FinancialsOverviewParams {
  from?: string;
  to?: string;
  months?: number;
}

export interface FinancialsTransactionsParams {
  page?: number;
  limit?: number;
  status?: TransactionStatus | "";
  paymentType?: FinancialPaymentType | "";
  search?: string;
  from?: string;
  to?: string;
}

export interface FinancialsTransactionsResponse {
  data: FinancialTransaction[];
  total: number;
  limit: number;
  page: number;
  totalPages: number;
  nextPage?: number | null;
}

export interface PaystackBalanceItem {
  currency: string;
  balance: number;
  balanceNaira?: number;
}

export interface PaystackBalanceResponse {
  source: string;
  balances: PaystackBalanceItem[];
}

export interface PaystackSettlement {
  id: number;
  status: string;
  currency: string;
  totalAmount: number;
  totalAmountNaira?: number;
  effectiveAmount: number;
  settlementDate: string;
  deductedAmount: number;
  settlementFee: number;
}

export interface PaystackSettlementsParams {
  page?: number;
  perPage?: number;
  from?: string;
  to?: string;
}

export interface PaystackSettlementsResponse {
  source: string;
  settlements: PaystackSettlement[];
  meta: {
    total: number;
    skipped: number;
    perPage: number;
    page: number;
  };
}

export const koboToNaira = (amountInKobo: number): number => amountInKobo / 100;

export const formatMoney = (amountInKobo: number, currency = "NGN"): string => {
  const naira =
    typeof amountInKobo === "number" && Number.isFinite(amountInKobo)
      ? koboToNaira(amountInKobo)
      : 0;
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(naira);
};

export const formatPaymentTypeLabel = (paymentType?: string | null): string => {
  if (paymentType === "one_time") return "Pay as you go";
  if (paymentType === "subscription") return "Subscription";
  return paymentType || "—";
};

export const formatTransactionStatus = (status?: string | null): string => {
  if (!status) return "—";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const formatMonthLabel = (month: string): string => {
  const [year, mon] = month.split("-");
  if (!year || !mon) return month;
  const date = new Date(Number(year), Number(mon) - 1, 1);
  if (Number.isNaN(date.getTime())) return month;
  return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
};

export const formatDateShort = (value?: string | null): string => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateRange = (from?: string | null, to?: string | null): string => {
  if (!from && !to) return "";
  return `${formatDateShort(from)} → ${formatDateShort(to)}`;
};

export const formatDateTime = (value?: string | null): string => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDateInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const defaultOverviewRange = (): { from: string; to: string } => {
  const to = new Date();
  const from = new Date();
  from.setMonth(from.getMonth() - 6);
  return { from: formatDateInput(from), to: formatDateInput(to) };
};

export const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (typeof error === "object" && error && "response" in error) {
    const message = (
      error as { response?: { data?: { message?: string } } }
    ).response?.data?.message;
    if (typeof message === "string" && message.trim()) return message;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
};
