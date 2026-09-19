import React from "react";
import DocsCallout from "../components/DocsCallout";
import type { DocsSection } from "../types";

const headings = [
  { id: "overview", title: "What tickets are" },
  { id: "categories", title: "Categories first" },
  { id: "create", title: "Create a ticket" },
  { id: "list", title: "List and filters" },
  { id: "detail", title: "Ticket detail" },
  { id: "lifecycle", title: "Lifecycle actions" },
  { id: "attachments", title: "Attachments" },
];

const TicketsContent: React.FC = () => (
  <>
    <section id="overview" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        What tickets are
      </h3>
      <p className="text-sm leading-relaxed">
        A ticket is an incident opened by staff <strong>for</strong> a customer account. You are the
        creator (<em>createdBy</em>); the customer is the account the ticket belongs to (
        <em>createdFor</em>).
      </p>
      <DocsCallout title="Eligibility">
        You can only create a ticket for an account that currently has entitlement: an active
        subscription with remaining incidents in the billing period, or an unused pay-as-you-go
        (PAYG) credit.
      </DocsCallout>
    </section>

    <section id="categories" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Categories first
      </h3>
      <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
        <li>Open Tickets and use the categories / sub-categories management UI when available.</li>
        <li>Ensure the incident type has a category and, if needed, a sub-category before filing.</li>
        <li>When creating a ticket, pick category then sub-category from the dropdowns.</li>
      </ol>
    </section>

    <section id="create" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Create a ticket
      </h3>
      <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
        <li>Click <strong>Create ticket</strong> (or equivalent) on the Tickets page.</li>
        <li>
          Search <strong>eligible accounts</strong> only — the picker lists customers who can open
          an incident right now (subscription or PAYG). Filter by source if needed.
        </li>
        <li>
          Fill required fields: title, description, category / sub-category, and any location or
          type fields shown.
        </li>
        <li>
          Complete <strong>contact information</strong> and <strong>victim information</strong>{" "}
          where prompted (structured fields, not free-form blobs).
        </li>
        <li>Optionally attach files (images, PDFs, etc.).</li>
        <li>Submit. Success: the new ticket appears in the list and opens with status Created / Pending.</li>
      </ol>
      <DocsCallout tone="warning" title="If create fails">
        Confirm the account still has entitlement, required fields are filled, and attachments are
        within size/type limits. An ineligible account will not appear in (or will be rejected by)
        the eligible-accounts flow.
      </DocsCallout>
    </section>

    <section id="list" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        List and filters
      </h3>
      <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
        <li>Use search for title, ticket id, or related text as supported by the page.</li>
        <li>Filter by status, severity, tier, or category when those controls are present.</li>
        <li>Open a row to go to ticket detail.</li>
      </ul>
    </section>

    <section id="detail" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Ticket detail
      </h3>
      <p className="text-sm leading-relaxed">
        Detail shows status, severity, tier, entitlement source (subscription vs PAYG), contact /
        victim blocks, assignees, notes, and attachments. Preview attachments from the list; use
        assign / analyse / resolve actions from the action bar or modals.
      </p>
    </section>

    <section id="lifecycle" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Lifecycle actions
      </h3>
      <p className="text-sm leading-relaxed mb-2">
        Typical flow (exact buttons depend on status and your role):
      </p>
      <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
        <li>
          <strong>Analyse</strong> — move into analysing; set severity / tier when prompted.
        </li>
        <li>
          <strong>Assign</strong> — assign a responder (dropdowns for staff). May show Assigned or
          Reassigned.
        </li>
        <li>
          <strong>Respond / In progress</strong> — responder work underway.
        </li>
        <li>
          <strong>Escalate</strong> — raise when the case needs higher attention.
        </li>
        <li>
          <strong>Resolve</strong> then <strong>Close</strong> when work is complete.
        </li>
      </ol>
      <DocsCallout title="Statuses you will see">
        Created, Pending, Analysing, Assigned, Reassigned, In progress, Resolved, Closed, Escalated.
        See the Glossary for short definitions.
      </DocsCallout>
    </section>

    <section id="attachments" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Attachments
      </h3>
      <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
        <li>Add files when creating or updating a ticket if the UI allows uploads.</li>
        <li>On detail, click an attachment to preview (images and common document types).</li>
        <li>Filenames come from the file or the URL path when the API returns plain URLs.</li>
      </ul>
    </section>
  </>
);

export const ticketsSection: DocsSection = {
  id: "tickets",
  title: "Tickets",
  summary:
    "Create incidents for eligible accounts, filter the list, and run analyse → assign → resolve.",
  keywords: [
    "ticket",
    "eligible",
    "create",
    "assign",
    "analyse",
    "attachment",
    "contact",
    "victim",
    "PAYG",
  ],
  headings,
  content: <TicketsContent />,
};
