import React from "react";
import DocsCallout from "../components/DocsCallout";
import type { DocsSection } from "../types";

const headings = [
  { id: "plans", title: "Subscription plans" },
  { id: "pricing", title: "Pricing fields" },
  { id: "active", title: "Active flag" },
  { id: "subscribers", title: "Subscribers" },
  { id: "external-cta", title: "External CTA" },
];

const SubscriptionsContent: React.FC = () => (
  <>
    <section id="plans" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Subscription plans
      </h3>
      <p className="text-sm leading-relaxed">
        Plans define what customers can buy: recurring <strong>subscription</strong> products versus{" "}
        <strong>pay-as-you-go (PAYG)</strong> incident credits. Manage plans from the Subscriptions
        area (Admin / Super Admin).
      </p>
      <DocsCallout tone="admin" title="Admins only">
        Creating or editing plans is limited to Admin roles. Other staff still need to understand
        subscription vs PAYG when creating tickets.
      </DocsCallout>
    </section>

    <section id="pricing" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Pricing fields
      </h3>
      <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
        <li>
          Amounts are often stored in <strong>kobo</strong> (1 Naira = 100 kobo). The UI may show
          Naira for readability.
        </li>
        <li>
          Confirm you are editing the intended currency display before saving price changes.
        </li>
        <li>
          Incident limits (<em>max incidents</em> or similar) control how many tickets a subscriber
          can open in a billing period; unlimited may be represented as empty/null.
        </li>
      </ul>
    </section>

    <section id="active" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Active flag
      </h3>
      <p className="text-sm leading-relaxed">
        Only <strong>active</strong> plans should be offered to customers. Deactivate a plan when it
        should no longer be sold; existing subscribers may still need separate handling.
      </p>
    </section>

    <section id="subscribers" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Subscribers
      </h3>
      <p className="text-sm leading-relaxed">
        The Subscribers list shows customer accounts tied to plans. Use it to confirm who has an
        active subscription when eligibility questions come up during ticket create.
      </p>
    </section>

    <section id="external-cta" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        External CTA
      </h3>
      <p className="text-sm leading-relaxed">
        External CTA is a separate list of public interest / call-to-action leads — not the same as
        paying subscribers. Use it for follow-up on people who expressed interest via public CTAs,
        not for incident entitlement.
      </p>
      <DocsCallout title="Subscribers vs External CTA">
        <ul>
          <li>
            <strong>Subscribers</strong> — customers with (or related to) subscription products.
          </li>
          <li>
            <strong>External CTA</strong> — inbound interest leads from public CTAs.
          </li>
        </ul>
      </DocsCallout>
    </section>
  </>
);

export const subscriptionsSection: DocsSection = {
  id: "subscriptions",
  title: "Subscriptions & External CTA",
  summary:
    "Plans (subscription vs PAYG), pricing, active flag, subscribers list, and External CTA leads.",
  keywords: [
    "subscription",
    "PAYG",
    "plan",
    "kobo",
    "naira",
    "subscribers",
    "CTA",
    "pricing",
  ],
  headings,
  content: <SubscriptionsContent />,
};
