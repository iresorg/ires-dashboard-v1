import React from "react";
import DocsCallout from "../components/DocsCallout";
import type { DocsSection } from "../types";

const headings = [
  { id: "source-of-truth", title: "Local ledger" },
  { id: "overview", title: "Overview cards & chart" },
  { id: "transactions", title: "Transactions table" },
  { id: "sync", title: "Sync from Paystack" },
  { id: "wallet", title: "Wallet & settlements" },
];

const FinancialsContent: React.FC = () => (
  <>
    <section id="source-of-truth" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Local ledger
      </h3>
      <p className="text-sm leading-relaxed">
        Financials in the dashboard treat the <strong>local ledger</strong> as the source of truth
        for revenue and transaction history shown on the page. Paystack is the payment processor;
        use sync to pull processor data into that ledger when needed.
      </p>
      <DocsCallout tone="admin" title="Admins only">
        Financials is visible to Admin / Super Admin. Other roles will not see this sidebar item.
      </DocsCallout>
    </section>

    <section id="overview" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Overview cards & chart
      </h3>
      <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
        <li>Open Financials from the sidebar.</li>
        <li>
          Set the date range with the date pickers (typically on the right of the toolbar).
        </li>
        <li>
          Summary cards show totals for the selected range; the chart visualises revenue over time.
        </li>
        <li>Amounts display in Naira; underlying values may be stored in kobo.</li>
      </ol>
    </section>

    <section id="transactions" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Transactions table
      </h3>
      <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
        <li>Search by reference, email, or other supported fields.</li>
        <li>Filter by status (success, failed, pending) and payment type (subscription vs PAYG).</li>
        <li>Paginate through results; refresh reloads from the local ledger for the current filters.</li>
      </ul>
    </section>

    <section id="sync" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Sync from Paystack
      </h3>
      <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
        <li>Click <strong>Sync from Paystack</strong> (cloud download control).</li>
        <li>Wait for success toast; the page refreshes ledger data.</li>
        <li>
          Success looks like: updated totals/transactions without needing a full browser reload.
        </li>
      </ol>
      <DocsCallout tone="warning" title="When to sync">
        Sync after you suspect missing payments or after a known Paystack settlement window. Do not
        spam sync; use it when the local ledger looks incomplete.
      </DocsCallout>
    </section>

    <section id="wallet" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Wallet & settlements
      </h3>
      <p className="text-sm leading-relaxed">
        Paystack <strong>wallet / balance</strong> and <strong>settlements</strong> reflect processor
        cash position and payouts. They are related to, but not identical with, the revenue figures
        from the local ledger. Use wallet/settlements for processor context; use ledger revenue for
        product payment history in-app.
      </p>
      <DocsCallout title="Quick distinction">
        <ul>
          <li>
            <strong>Local ledger / revenue</strong> — in-app record of subscription and PAYG payments.
          </li>
          <li>
            <strong>Wallet & settlements</strong> — Paystack balance and settlement batches.
          </li>
        </ul>
      </DocsCallout>
    </section>
  </>
);

export const financialsSection: DocsSection = {
  id: "financials",
  title: "Financials",
  summary:
    "Local ledger as source of truth, filters, Sync from Paystack, and wallet vs revenue.",
  keywords: [
    "financials",
    "paystack",
    "sync",
    "ledger",
    "revenue",
    "settlement",
    "wallet",
    "kobo",
  ],
  headings,
  content: <FinancialsContent />,
};
