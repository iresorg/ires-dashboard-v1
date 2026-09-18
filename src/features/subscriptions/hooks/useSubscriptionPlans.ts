import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createSubscriptionPlan,
  deleteSubscriptionPlan,
  getAdminSubscriptionPlans,
  updateSubscriptionPlan,
} from "../services/subscriptionPlanService";
import type {
  AccountType,
  CreateSubscriptionPlanPayload,
  PaymentType,
  SubscriptionPlan,
  UpdateSubscriptionPlanPayload,
} from "../types";
import { getApiErrorMessage } from "../types";

export const useSubscriptionPlans = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<AccountType | "">("");
  const [paymentType, setPaymentType] = useState<PaymentType | "">("");
  const [isSaving, setIsSaving] = useState(false);

  const fetchPlans = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAdminSubscriptionPlans({
        ...(accountType ? { accountType } : {}),
        ...(paymentType ? { paymentType } : {}),
      });
      setPlans(data);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to load subscription plans"));
    } finally {
      setIsLoading(false);
    }
  }, [accountType, paymentType]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const filteredPlans = useMemo(() => {
    return [...plans].sort((a, b) => {
      if (a.accountType !== b.accountType) {
        return a.accountType.localeCompare(b.accountType);
      }
      if (a.paymentType !== b.paymentType) {
        return (a.paymentType ?? "subscription").localeCompare(
          b.paymentType ?? "subscription"
        );
      }
      return a.tier - b.tier;
    });
  }, [plans]);

  const createPlan = async (payload: CreateSubscriptionPlanPayload) => {
    setIsSaving(true);
    try {
      const result = await createSubscriptionPlan(payload);
      await fetchPlans();
      return result;
    } finally {
      setIsSaving(false);
    }
  };

  const updatePlan = async (id: string, payload: UpdateSubscriptionPlanPayload) => {
    setIsSaving(true);
    try {
      const result = await updateSubscriptionPlan(id, payload);
      await fetchPlans();
      return result;
    } finally {
      setIsSaving(false);
    }
  };

  const togglePlanActive = async (plan: SubscriptionPlan) => {
    const result = await updateSubscriptionPlan(plan.id, { active: !plan.active });
    await fetchPlans();
    return result;
  };

  const removePlan = async (id: string) => {
    const result = await deleteSubscriptionPlan(id);
    await fetchPlans();
    return result;
  };

  return {
    plans,
    filteredPlans,
    isLoading,
    isSaving,
    error,
    accountType,
    setAccountType,
    paymentType,
    setPaymentType,
    fetchPlans,
    createPlan,
    updatePlan,
    togglePlanActive,
    removePlan,
  };
};
