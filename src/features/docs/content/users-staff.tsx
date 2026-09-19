import React from "react";
import DocsCallout from "../components/DocsCallout";
import type { DocsSection } from "../types";

const headings = [
  { id: "who", title: "Who manages what" },
  { id: "users", title: "Users" },
  { id: "agents", title: "Agents" },
  { id: "responders", title: "Responders" },
  { id: "avatars", title: "Avatars" },
  { id: "activate", title: "Activate / deactivate" },
];

const UsersStaffContent: React.FC = () => (
  <>
    <section id="who" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Who manages what
      </h3>
      <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
        <li>
          <strong>Users</strong> — Admin / Super Admin. Platform admin accounts.
        </li>
        <li>
          <strong>Agents</strong> — Super Admin, Admin, Agent Admin.
        </li>
        <li>
          <strong>Responders</strong> — roles allowed to manage the responders list (typically Admin
          and responder admins).
        </li>
      </ul>
      <DocsCallout tone="admin" title="Admins only">
        If you do not see Users in the sidebar, your role cannot manage those accounts. Ask an Admin
        for access changes.
      </DocsCallout>
    </section>

    <section id="users" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Users
      </h3>
      <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
        <li>Open Users from the sidebar.</li>
        <li>Create or edit with email, name, role, and password fields as shown.</li>
        <li>Success: the user appears in the table with the selected role.</li>
      </ol>
    </section>

    <section id="agents" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Agents
      </h3>
      <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
        <li>Open Agents → Create agent (or edit an existing row).</li>
        <li>Fill identity and role fields; save.</li>
        <li>Agents can be assigned to ticket workflows according to their role.</li>
      </ol>
    </section>

    <section id="responders" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Responders
      </h3>
      <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
        <li>Open Responders → create or edit.</li>
        <li>Responders are the staff you assign on ticket detail.</li>
        <li>Keep profiles up to date so assign dropdowns stay accurate.</li>
      </ol>
    </section>

    <section id="avatars" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Avatars
      </h3>
      <p className="text-sm leading-relaxed">
        Where the UI supports it, upload or update an avatar on create/edit. A successful save shows
        the new image in the list or profile. If upload fails, retry with a smaller image or a
        supported format (typically JPEG/PNG).
      </p>
    </section>

    <section id="activate" className="scroll-mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
        Activate / deactivate
      </h3>
      <p className="text-sm leading-relaxed">
        Deactivated staff should not continue operating as active assignees. Use the activate /
        deactivate control on the row or edit form. Confirm the status badge updates after save.
      </p>
      <DocsCallout tone="warning" title="Before deactivating">
        Check open tickets assigned to that person and reassign if needed.
      </DocsCallout>
    </section>
  </>
);

export const usersStaffSection: DocsSection = {
  id: "users-staff",
  title: "Users, agents & responders",
  summary: "Create and edit staff accounts, avatars, roles, and active status.",
  keywords: ["users", "agents", "responders", "avatar", "role", "deactivate"],
  headings,
  content: <UsersStaffContent />,
};
