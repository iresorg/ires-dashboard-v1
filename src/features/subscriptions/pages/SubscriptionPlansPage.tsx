import React, { useState } from "react";
import { useSubscriptionPlans } from "../hooks/useSubscriptionPlans";
import PlanFormModal from "../components/PlanFormModal";
import PlanCards from "../components/PlanCards";
import PlanCardsSkeleton from "../components/PlanCardsSkeleton";
import PlanTableSkeleton from "../components/PlanTableSkeleton";
import DeletePlanModal from "../components/DeletePlanModal";
import Dropdown from "@/shared/components/ui/Dropdown";
import { useToast } from "@/shared/components/ui/useToast";
import type {
  AccountType,
  CreateSubscriptionPlanPayload,
  PaymentType,
  SubscriptionPlan,
} from "../types";
import {
  formatInterval,
  formatPaymentType,
  formatPlanPrice,
  getApiErrorMessage,
  isSubscriptionPlan,
} from "../types";

const SubscriptionPlansPage: React.FC = () => {
  const {
    filteredPlans,
    isLoading,
    isSaving,
    error,
    accountType,
    setAccountType,
    paymentType,
    setPaymentType,
    createPlan,
    updatePlan,
    togglePlanActive,
    removePlan,
    fetchPlans,
  } = useSubscriptionPlans();
  const { showSuccess, showError, showInfo } = useToast();
  const [view, setView] = useState<"table" | "cards">("table");
  const [formOpen, setFormOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [deletingPlan, setDeletingPlan] = useState<SubscriptionPlan | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const openCreate = () => {
    setEditingPlan(null);
    setFormOpen(true);
  };

  const openEdit = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    setFormOpen(true);
  };

  const handleSave = async (payload: CreateSubscriptionPlanPayload) => {
    try {
      if (editingPlan) {
        await updatePlan(editingPlan.id, payload);
        showSuccess("Plan updated");
      } else {
        await createPlan(payload);
        showSuccess("Plan created");
      }
      setFormOpen(false);
      setEditingPlan(null);
    } catch (err) {
      showError(getApiErrorMessage(err, "Could not save plan"));
    }
  };

  const handleToggle = async (plan: SubscriptionPlan) => {
    try {
      await togglePlanActive(plan);
      showSuccess(plan.active ? "Plan hidden from public list" : "Plan is now active");
    } catch (err) {
      showError(getApiErrorMessage(err, "Could not update plan visibility"));
    }
  };

  const handleDelete = async () => {
    if (!deletingPlan) return;
    setIsDeleting(true);
    try {
      const result = await removePlan(deletingPlan.id);
      if (result.active === false) {
        showInfo("Plan hidden", result.message);
      } else {
        showSuccess("Plan deleted", result.message);
      }
      setDeletingPlan(null);
    } catch (err) {
      showError(getApiErrorMessage(err, "Could not delete plan"));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="ui-toolbar">
        <div>
          <h2 className="text-xl font-semibold text-[var(--ires-navy-blue)]">Subscription plans</h2>
          <p className="text-sm text-[var(--muted)]">
            Manage catalog pricing, visibility, and feature lists.
          </p>
        </div>
        <button type="button" className="ui-btn-primary" onClick={openCreate}>
          Create plan
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="w-full sm:w-56">
            <Dropdown
              options={[
                { value: "", label: "All account types" },
                { value: "individual", label: "Individual" },
                { value: "organization", label: "Organization" },
              ]}
              value={accountType}
              onChange={(value) => setAccountType(value as AccountType | "")}
              placeholder="All account types"
            />
          </div>
          <div className="w-full sm:w-56">
            <Dropdown
              options={[
                { value: "", label: "All payment types" },
                { value: "subscription", label: "Subscription" },
                { value: "one_time", label: "Pay as you go" },
              ]}
              value={paymentType}
              onChange={(value) => setPaymentType(value as PaymentType | "")}
              placeholder="All payment types"
            />
          </div>
        </div>
        <div className="inline-flex rounded-lg border border-[var(--border)] overflow-hidden">
          <button
            type="button"
            className={`px-3 h-10 text-sm ${view === "table" ? "bg-[var(--ires-navy-blue)] text-white" : "bg-white text-[var(--ires-navy-blue)]"}`}
            onClick={() => setView("table")}
          >
            Table
          </button>
          <button
            type="button"
            className={`px-3 h-10 text-sm ${view === "cards" ? "bg-[var(--ires-navy-blue)] text-white" : "bg-white text-[var(--ires-navy-blue)]"}`}
            onClick={() => setView("cards")}
          >
            Public cards
          </button>
        </div>
      </div>

      {error && (
        <div className="ui-card px-4 py-3 text-sm text-[var(--ires-red)] flex items-center justify-between gap-3">
          <span>{error}</span>
          <button type="button" className="ui-action-btn" onClick={fetchPlans}>
            Retry
          </button>
        </div>
      )}

      {view === "cards" ? (
        isLoading ? (
          <PlanCardsSkeleton />
        ) : (
          <PlanCards plans={filteredPlans} />
        )
      ) : (
        <div className="ui-table-wrap">
          <table className="ui-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Account</th>
                <th>Payment</th>
                <th>Tier</th>
                <th>Price</th>
                <th>Interval</th>
                <th>Active</th>
                <th>Paystack</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <PlanTableSkeleton />
              ) : filteredPlans.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-[var(--muted)]">
                    No subscription plans yet. Create the first plan to start the catalog.
                  </td>
                </tr>
              ) : (
                filteredPlans.map((plan) => (
                  <tr key={plan.id}>
                    <td>
                      <div className="font-medium">{plan.name}</div>
                      <div className="text-xs text-[var(--muted)] max-w-[220px] truncate">
                        {plan.description}
                      </div>
                    </td>
                    <td className="capitalize">{plan.accountType}</td>
                    <td>{formatPaymentType(plan.paymentType)}</td>
                    <td>{plan.tier}</td>
                    <td>{formatPlanPrice(plan.amount, plan.currency)}</td>
                    <td>
                      {isSubscriptionPlan(plan)
                        ? formatInterval(plan.interval)
                        : "—"}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleToggle(plan)}
                        className={`ui-chip ${
                          plan.active
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-[var(--ires-red)]"
                        }`}
                      >
                        {plan.active ? "Active" : "Hidden"}
                      </button>
                    </td>
                    <td className="text-xs text-[var(--muted)]">
                      {isSubscriptionPlan(plan)
                        ? plan.paystackPlanCode || "—"
                        : "—"}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button type="button" className="ui-action-btn" onClick={() => openEdit(plan)}>
                          Edit
                        </button>
                        <button
                          type="button"
                          className="ui-action-btn ui-action-danger"
                          onClick={() => setDeletingPlan(plan)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {formOpen && (
        <PlanFormModal
          plan={editingPlan}
          isSaving={isSaving}
          onClose={() => {
            setFormOpen(false);
            setEditingPlan(null);
          }}
          onSubmit={handleSave}
        />
      )}

      {deletingPlan && (
        <DeletePlanModal
          planName={deletingPlan.name}
          isSaving={isDeleting}
          onClose={() => setDeletingPlan(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default SubscriptionPlansPage;
