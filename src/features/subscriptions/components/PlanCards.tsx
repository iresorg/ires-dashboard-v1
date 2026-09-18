import React from "react";
import type { SubscriptionPlan } from "../types";
import {
  formatInterval,
  formatPaymentType,
  formatPlanPrice,
  isSubscriptionPlan,
} from "../types";

interface PlanCardsProps {
  plans: SubscriptionPlan[];
}

const PlanCards: React.FC<PlanCardsProps> = ({ plans }) => {
  if (plans.length === 0) {
    return (
      <div className="ui-card p-8 text-sm text-[var(--muted)] text-center">
        No plans to preview for this filter.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {plans.map((plan) => {
        const isSubscription = isSubscriptionPlan(plan);

        return (
          <article key={plan.id} className="ui-card p-5 flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                  {plan.accountType} · {formatPaymentType(plan.paymentType)} · Tier{" "}
                  {plan.tier}
                </p>
                <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)] mt-1">
                  {plan.name}
                </h3>
              </div>
              <span
                className={`ui-chip ${
                  plan.active
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-[var(--ires-red)]"
                }`}
              >
                {plan.active ? "Active" : "Hidden"}
              </span>
            </div>
            <p className="text-sm text-[var(--muted)] mt-2">{plan.description}</p>
            <p className="mt-4 text-2xl font-semibold text-[var(--ires-navy-blue)]">
              {formatPlanPrice(plan.amount, plan.currency)}
              {isSubscription && (
                <span className="text-sm font-medium text-[var(--muted)]">
                  /{formatInterval(plan.interval).toLowerCase()}
                </span>
              )}
            </p>
            {!isSubscription && (
              <p className="text-xs text-[var(--muted)] mt-1">One-time payment</p>
            )}
            <p className="text-xs text-[var(--muted)] mt-1">
              {plan.maxIncidents == null
                ? "Unlimited incidents"
                : `${plan.maxIncidents} incident${plan.maxIncidents === 1 ? "" : "s"}`}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {plan.features.length === 0 ? (
                <span className="text-xs text-[var(--muted)]">No features listed</span>
              ) : (
                plan.features.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center rounded-full bg-[var(--cool-blue-tint)] text-[var(--ires-navy-blue)] px-2.5 py-1 text-xs"
                  >
                    {feature}
                  </span>
                ))
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default PlanCards;
