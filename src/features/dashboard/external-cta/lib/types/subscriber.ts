// Subscriber Types
export type SubscriberPaymentType = "subscription" | "one_time";
export type SubscriberStatus =
  | "active"
  | "expired"
  | "cancelled"
  | "past_due"
  | "available";

export interface Subscriber {
  id: string;
  userName: string;
  email: string;
  role: "individual" | "organization";
  planId?: string | null;
  planSubscribedTo: string;
  paymentType?: SubscriberPaymentType;
  interval?: string | null;
  amount: number | string;
  startDate: string;
  endDate: string | null;
  status: SubscriberStatus;
  paygCreditsAvailable?: number | null;
}

export interface SubscribersResponse {
  data: Subscriber[];
  total: number;
  limit: number;
  page: number;
  totalPages: number;
  nextPage: number | null;
}

export interface GetSubscribersParams {
  search?: string;
  status?: SubscriberStatus;
  planId?: string;
  paymentType?: SubscriberPaymentType;
  page?: number;
  limit?: number;
}
