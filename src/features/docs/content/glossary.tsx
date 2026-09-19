import React from "react";
import type { DocsSection } from "../types";

const headings = [
  { id: "statuses", title: "Ticket statuses" },
  { id: "severity", title: "Severity" },
  { id: "tiers", title: "Tiers" },
  { id: "entitlement", title: "Entitlement sources" },
  { id: "money", title: "Money units" },
];

const GlossaryContent: React.FC = () => (
  <>
    <section id="statuses" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Ticket statuses
      </h3>
      <dl className="text-sm space-y-3 leading-relaxed">
        <div>
          <dt className="font-semibold text-[var(--ires-navy-blue)]">CREATED / PENDING</dt>
          <dd className="text-[var(--muted)]">Newly filed; not yet fully in analysis or assignment.</dd>
        </div>
        <div>
          <dt className="font-semibold text-[var(--ires-navy-blue)]">ANALYSING</dt>
          <dd className="text-[var(--muted)]">Under review; severity/tier may be set here.</dd>
        </div>
        <div>
          <dt className="font-semibold text-[var(--ires-navy-blue)]">ASSIGNED / REASSIGNED</dt>
          <dd className="text-[var(--muted)]">A responder owns the ticket (or ownership changed).</dd>
        </div>
        <div>
          <dt className="font-semibold text-[var(--ires-navy-blue)]">IN_PROGRESS</dt>
          <dd className="text-[var(--muted)]">Active response work.</dd>
        </div>
        <div>
          <dt className="font-semibold text-[var(--ires-navy-blue)]">ESCALATED</dt>
          <dd className="text-[var(--muted)]">Raised for higher attention.</dd>
        </div>
        <div>
          <dt className="font-semibold text-[var(--ires-navy-blue)]">RESOLVED</dt>
          <dd className="text-[var(--muted)]">Work completed; may still need formal close.</dd>
        </div>
        <div>
          <dt className="font-semibold text-[var(--ires-navy-blue)]">CLOSED</dt>
          <dd className="text-[var(--muted)]">Ticket finished and closed.</dd>
        </div>
      </dl>
    </section>

    <section id="severity" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Severity
      </h3>
      <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
        <li>
          <strong>LOW</strong> — lower urgency.
        </li>
        <li>
          <strong>MEDIUM</strong> — standard priority.
        </li>
        <li>
          <strong>HIGH</strong> — urgent / high impact.
        </li>
      </ul>
    </section>

    <section id="tiers" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Tiers
      </h3>
      <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
        <li>
          <strong>TIER_1</strong> — first-line handling.
        </li>
        <li>
          <strong>TIER_2</strong> — escalated / specialised handling.
        </li>
      </ul>
    </section>

    <section id="entitlement" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Entitlement sources
      </h3>
      <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
        <li>
          <strong>subscription</strong> — ticket consumes a subscription incident allowance for the
          current billing period.
        </li>
        <li>
          <strong>payg</strong> — ticket consumes a pay-as-you-go incident credit.
        </li>
      </ul>
    </section>

    <section id="money" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Money units
      </h3>
      <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
        <li>
          <strong>Kobo</strong> — smallest unit (100 kobo = ₦1).
        </li>
        <li>
          <strong>Naira (₦)</strong> — display currency in most Financials and plan UIs.
        </li>
      </ul>
    </section>
  </>
);

export const glossarySection: DocsSection = {
  id: "glossary",
  title: "Glossary",
  summary: "Statuses, severity, tiers, entitlement sources, and money units.",
  keywords: [
    "glossary",
    "status",
    "severity",
    "tier",
    "subscription",
    "payg",
    "kobo",
    "naira",
  ],
  headings,
  content: <GlossaryContent />,
};
