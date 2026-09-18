export type AccountType = "individual" | "organization";
export type PaymentType = "subscription" | "one_time";
export type PlanInterval = "monthly" | "yearly" | "annually" | "weekly";

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: number;
  accountType: AccountType;
  paymentType: PaymentType;
  amount: number;
  currency: string;
  interval: string;
  paystackPlanCode?: string | null;
  description: string;
  features: string[];
  maxIncidents: number | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionPlanListResponse {
  plans: SubscriptionPlan[];
}

export interface SubscriptionPlanMutationResponse {
  message: string;
  plan: SubscriptionPlan;
}

export interface DeletePlanResponse {
  message: string;
  id: string;
  active?: boolean;
}

export interface SubscriptionPlanListParams {
  accountType?: AccountType;
  paymentType?: PaymentType;
}

export interface CreateSubscriptionPlanPayload {
  name: string;
  tier: number;
  accountType: AccountType;
  paymentType: PaymentType;
  amount: number;
  currency?: string;
  interval?: string;
  description: string;
  features: string[];
  maxIncidents?: number | null;
  active?: boolean;
}

export type UpdateSubscriptionPlanPayload = Partial<CreateSubscriptionPlanPayload>;

export const koboToNaira = (amountInKobo: number): number => amountInKobo / 100;

export const nairaToKobo = (amountInNaira: number): number =>
  Math.round(amountInNaira * 100);

export const formatPlanPrice = (amountInKobo: number, currency = "NGN"): string => {
  const naira = koboToNaira(amountInKobo);
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(naira);
};

export const formatInterval = (interval: string): string => {
  if (!interval) return "Monthly";
  return interval.charAt(0).toUpperCase() + interval.slice(1);
};

export const formatPaymentType = (paymentType?: PaymentType | string): string => {
  if (paymentType === "one_time") return "Pay as you go";
  return "Subscription";
};

export const isSubscriptionPlan = (plan: {
  paymentType?: PaymentType | string;
}): boolean => plan.paymentType !== "one_time";

export const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (typeof error === "object" && error && "response" in error) {
    const message = (
      error as { response?: { data?: { message?: string } } }
    ).response?.data?.message;
    if (message) return message;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
};
