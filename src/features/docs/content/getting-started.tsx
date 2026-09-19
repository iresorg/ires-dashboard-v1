import React from "react";
import DocsCallout from "../components/DocsCallout";
import type { DocsSection } from "../types";

const headings = [
  { id: "login", title: "Sign in" },
  { id: "roles", title: "Roles at a glance" },
  { id: "navigation", title: "Finding your way" },
  { id: "where-next", title: "Where to go next" },
];

const GettingStartedContent: React.FC = () => (
  <>
    <section id="login" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Sign in
      </h3>
      <ol className="list-decimal pl-5 space-y-2 text-sm text-[var(--text)] leading-relaxed">
        <li>Open the dashboard login page and enter your staff email and password.</li>
        <li>After a successful sign-in you land on Overview.</li>
        <li>Use the sidebar to move between Tickets, Users, Agents, Responders, Subscriptions, and Financials (what you see depends on your role).</li>
      </ol>
      <DocsCallout title="Session tip">
        If you are signed out unexpectedly, sign in again. Do not share your password with other staff.
      </DocsCallout>
    </section>

    <section id="roles" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Roles at a glance
      </h3>
      <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
        <li>
          <strong>Super Admin / Admin</strong> — full access including Users, Subscriptions, and Financials.
        </li>
        <li>
          <strong>Agent Admin / Agent</strong> — tickets and agent-related work; limited admin menus.
        </li>
        <li>
          <strong>Responder Admin / Responder</strong> — tickets and responder workflows.
        </li>
      </ul>
      <DocsCallout tone="admin" title="Admins only">
        Some sidebar items (Users, Subscriptions, Financials) only appear for Admin / Super Admin. Documentation itself is available to every logged-in staff member.
      </DocsCallout>
    </section>

    <section id="navigation" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Finding your way
      </h3>
      <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
        <li>
          <strong>Overview</strong> — high-level dashboard home.
        </li>
        <li>
          <strong>Tickets</strong> — create and manage incidents for eligible customer accounts.
        </li>
        <li>
          <strong>Users / Agents / Responders</strong> — staff accounts (gated by role).
        </li>
        <li>
          <strong>Subscriptions / Subscribers</strong> — plans and who is subscribed.
        </li>
        <li>
          <strong>External CTA</strong> — public interest / CTA leads.
        </li>
        <li>
          <strong>Financials</strong> — local payment ledger and Paystack sync.
        </li>
        <li>
          <strong>Documentation</strong> — this guide (always at the bottom of the sidebar).
        </li>
      </ul>
    </section>

    <section id="where-next" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Where to go next
      </h3>
      <p className="text-sm leading-relaxed">
        Start with <strong>Tickets</strong> if you handle incidents day to day. Admins who manage billing should also read <strong>Subscriptions</strong> and <strong>Financials</strong>. Use the <strong>Glossary</strong> when you need a quick definition of statuses, tiers, or entitlement sources.
      </p>
    </section>
  </>
);

export const gettingStartedSection: DocsSection = {
  id: "getting-started",
  title: "Getting started",
  summary: "Sign in, understand roles, and find the main areas of the dashboard.",
  keywords: ["login", "roles", "sidebar", "overview", "staff"],
  headings,
  content: <GettingStartedContent />,
};
