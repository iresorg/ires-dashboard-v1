import api from "@/shared/services/api";
import type {
  FinancialsOverview,
  FinancialsOverviewParams,
  FinancialsTransactionsParams,
  FinancialsTransactionsResponse,
  FinancialTransaction,
  PaystackBalanceResponse,
  PaystackSettlementsParams,
  PaystackSettlementsResponse,
  SyncPaystackParams,
  SyncPaystackResponse,
} from "../types";

const skipAuthRedirect = { skipAuthRedirect: true };

const unwrapOverview = (payload: unknown): FinancialsOverview => {
  if (payload && typeof payload === "object" && "data" in payload) {
    const data = (payload as { data: unknown }).data;
    if (data && typeof data === "object" && "summary" in data) {
      return data as FinancialsOverview;
    }
  }
  return payload as FinancialsOverview;
};

const unwrapTransactions = (
  payload: unknown
): FinancialsTransactionsResponse => {
  if (!payload || typeof payload !== "object") {
    return { data: [], total: 0, limit: 10, page: 1, totalPages: 1 };
  }

  const body = payload as Record<string, unknown>;

  if (Array.isArray(body.data)) {
    return {
      data: body.data as FinancialTransaction[],
      total: Number(body.total ?? 0),
      limit: Number(body.limit ?? 10),
      page: Number(body.page ?? 1),
      totalPages: Number(body.totalPages ?? 1),
      nextPage: (body.nextPage as number | null | undefined) ?? null,
    };
  }

  if (Array.isArray(body.transactions)) {
    const transactions = body.transactions as FinancialTransaction[];
    return {
      data: transactions,
      total: Number(body.total ?? transactions.length),
      limit: transactions.length || 10,
      page: 1,
      totalPages: 1,
      nextPage: null,
    };
  }

  if (body.data && typeof body.data === "object") {
    return unwrapTransactions(body.data);
  }

  return { data: [], total: 0, limit: 10, page: 1, totalPages: 1 };
};

const unwrapBalance = (payload: unknown): PaystackBalanceResponse => {
  if (payload && typeof payload === "object" && "data" in payload) {
    const data = (payload as { data: unknown }).data;
    if (data && typeof data === "object" && "balances" in data) {
      return data as PaystackBalanceResponse;
    }
  }
  return payload as PaystackBalanceResponse;
};

const unwrapSettlements = (payload: unknown): PaystackSettlementsResponse => {
  if (payload && typeof payload === "object" && "data" in payload) {
    const data = (payload as { data: unknown }).data;
    if (data && typeof data === "object" && "settlements" in data) {
      return data as PaystackSettlementsResponse;
    }
  }
  return payload as PaystackSettlementsResponse;
};

export const getFinancialsOverview = async (
  params: FinancialsOverviewParams = {}
): Promise<FinancialsOverview> => {
  const query: Record<string, string | number> = {};
  if (params.from) query.from = params.from;
  if (params.to) query.to = params.to;
  if (params.months) query.months = params.months;

  const response = await api.get("/admin/financials/overview", {
    ...skipAuthRedirect,
    params: Object.keys(query).length ? query : undefined,
  });
  return unwrapOverview(response.data);
};

export const getFinancialsTransactions = async (
  params: FinancialsTransactionsParams = {}
): Promise<FinancialsTransactionsResponse> => {
  const query: Record<string, string | number> = {};
  if (params.page) query.page = params.page;
  if (params.limit) query.limit = params.limit;
  if (params.status) query.status = params.status;
  if (params.paymentType) query.paymentType = params.paymentType;
  if (params.search?.trim()) query.search = params.search.trim();
  if (params.from) query.from = params.from;
  if (params.to) query.to = params.to;

  const response = await api.get("/admin/financials/transactions", {
    ...skipAuthRedirect,
    params: query,
  });
  return unwrapTransactions(response.data);
};

export const getPaystackBalance = async (): Promise<PaystackBalanceResponse> => {
  const response = await api.get("/admin/financials/paystack/balance", {
    ...skipAuthRedirect,
  });
  return unwrapBalance(response.data);
};

export const getPaystackSettlements = async (
  params: PaystackSettlementsParams = {}
): Promise<PaystackSettlementsResponse> => {
  const query: Record<string, string | number> = {};
  if (params.page) query.page = params.page;
  if (params.perPage) query.perPage = params.perPage;
  if (params.from) query.from = params.from;
  if (params.to) query.to = params.to;

  const response = await api.get("/admin/financials/paystack/settlements", {
    ...skipAuthRedirect,
    params: Object.keys(query).length ? query : undefined,
  });
  return unwrapSettlements(response.data);
};

const unwrapSync = (payload: unknown): SyncPaystackResponse => {
  if (payload && typeof payload === "object" && "data" in payload) {
    const data = (payload as { data: unknown }).data;
    if (data && typeof data === "object") {
      return data as SyncPaystackResponse;
    }
  }
  return payload as SyncPaystackResponse;
};

export const syncPaystackTransactions = async (
  params: SyncPaystackParams = {}
): Promise<SyncPaystackResponse> => {
  const query: Record<string, string> = {};
  if (params.from) query.from = params.from;
  if (params.to) query.to = params.to;

  const response = await api.post(
    "/admin/financials/sync-paystack",
    {},
    {
      ...skipAuthRedirect,
      params: Object.keys(query).length ? query : undefined,
    }
  );
  return unwrapSync(response.data);
};
