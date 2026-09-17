import React, { useEffect, useState } from "react";
import CloseIcon from "@/shared/assets/icons/close.svg";
import FeatureChips from "./FeatureChips";
import type {
  AccountType,
  CreateSubscriptionPlanPayload,
  SubscriptionPlan,
} from "../types";
import { koboToNaira, nairaToKobo } from "../types";

interface PlanFormModalProps {
  plan?: SubscriptionPlan | null;
  isSaving?: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateSubscriptionPlanPayload) => Promise<void>;
}

const PlanFormModal: React.FC<PlanFormModalProps> = ({
  plan,
  isSaving = false,
  onClose,
  onSubmit,
}) => {
  const isEdit = Boolean(plan);
  const [name, setName] = useState(plan?.name ?? "");
  const [tier, setTier] = useState(String(plan?.tier ?? 1));
  const [accountType, setAccountType] = useState<AccountType>(
    plan?.accountType ?? "individual"
  );
  const [nairaAmount, setNairaAmount] = useState(
    plan ? String(koboToNaira(plan.amount)) : ""
  );
  const [currency, setCurrency] = useState(plan?.currency ?? "NGN");
  const [interval, setInterval] = useState(plan?.interval ?? "monthly");
  const [description, setDescription] = useState(plan?.description ?? "");
  const [features, setFeatures] = useState<string[]>(plan?.features ?? []);
  const [unlimitedIncidents, setUnlimitedIncidents] = useState(
    plan ? plan.maxIncidents == null : false
  );
  const [maxIncidents, setMaxIncidents] = useState(
    plan?.maxIncidents != null ? String(plan.maxIncidents) : "1"
  );
  const [active, setActive] = useState(plan?.active ?? true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Name is required";
    if (!tier || Number(tier) < 1) next.tier = "Tier must be 1 or higher";
    if (!nairaAmount || Number(nairaAmount) < 0) next.amount = "Enter a valid amount in naira";
    if (!description.trim()) next.description = "Description is required";
    if (!unlimitedIncidents && (!maxIncidents || Number(maxIncidents) < 0)) {
      next.maxIncidents = "Enter a valid incident limit";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload: CreateSubscriptionPlanPayload = {
      name: name.trim(),
      tier: Number(tier),
      accountType,
      amount: nairaToKobo(Number(nairaAmount)),
      currency,
      interval,
      description: description.trim(),
      features,
      maxIncidents: unlimitedIncidents ? null : Number(maxIncidents),
      active,
    };

    await onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-[var(--ires-dark-blue)]/40" onClick={onClose} />
      <div
        className="relative z-10 ui-card w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] bg-[var(--ires-navy-blue)]">
          <h2 className="text-sm font-semibold text-white">
            {isEdit ? "Edit plan" : "Create plan"}
          </h2>
          <button type="button" onClick={onClose} aria-label="Close">
            <img src={CloseIcon} alt="" className="w-3.5 h-3.5 invert" />
          </button>
        </div>

        <form className="p-5 space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Name</span>
              <input className="ui-input mt-1" value={name} onChange={(e) => setName(e.target.value)} />
              {errors.name && <p className="text-xs text-[var(--ires-red)] mt-1">{errors.name}</p>}
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Tier</span>
              <input
                type="number"
                min={1}
                className="ui-input mt-1"
                value={tier}
                onChange={(e) => setTier(e.target.value)}
              />
              {errors.tier && <p className="text-xs text-[var(--ires-red)] mt-1">{errors.tier}</p>}
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Account type</span>
              <select
                className="ui-input mt-1"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value as AccountType)}
              >
                <option value="individual">Individual</option>
                <option value="organization">Organization</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Price (₦)</span>
              <input
                type="number"
                min={0}
                className="ui-input mt-1"
                value={nairaAmount}
                onChange={(e) => setNairaAmount(e.target.value)}
                placeholder="50000"
              />
              {errors.amount && <p className="text-xs text-[var(--ires-red)] mt-1">{errors.amount}</p>}
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Currency</span>
              <input className="ui-input mt-1" value={currency} onChange={(e) => setCurrency(e.target.value)} />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Interval</span>
              <select className="ui-input mt-1" value={interval} onChange={(e) => setInterval(e.target.value)}>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="annually">Annually</option>
                <option value="weekly">Weekly</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-xs font-medium text-[var(--muted)]">Description</span>
            <textarea
              className="ui-input mt-1 min-h-[88px] resize-y"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="text-xs text-[var(--ires-red)] mt-1">{errors.description}</p>
            )}
          </label>

          <div>
            <span className="text-xs font-medium text-[var(--muted)]">Features</span>
            <div className="mt-1">
              <FeatureChips features={features} onChange={setFeatures} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-medium text-[var(--muted)]">Max incidents</span>
              <label className="flex items-center gap-2 mt-2 text-sm">
                <input
                  type="checkbox"
                  checked={unlimitedIncidents}
                  onChange={(e) => setUnlimitedIncidents(e.target.checked)}
                />
                Unlimited
              </label>
              {!unlimitedIncidents && (
                <input
                  type="number"
                  min={0}
                  className="ui-input mt-2"
                  value={maxIncidents}
                  onChange={(e) => setMaxIncidents(e.target.value)}
                />
              )}
              {errors.maxIncidents && (
                <p className="text-xs text-[var(--ires-red)] mt-1">{errors.maxIncidents}</p>
              )}
            </div>
            <label className="flex items-center gap-2 mt-6 text-sm">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />
              Active (visible on public pricing)
            </label>
          </div>

          {isEdit && plan?.paystackPlanCode && (
            <p className="text-xs text-[var(--muted)]">
              Paystack code: <span className="font-medium text-[var(--ires-navy-blue)]">{plan.paystackPlanCode}</span>
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="ui-action-btn h-10 px-4" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="ui-btn-primary" disabled={isSaving}>
              {isSaving ? "Saving..." : isEdit ? "Save changes" : "Create plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanFormModal;
