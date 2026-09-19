import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes";
import type { DocsHeading, DocsSectionMeta } from "../types";

const DocsLayout: React.FC<{
  section: DocsSectionMeta;
  headings: DocsHeading[];
  children: React.ReactNode;
}> = ({ section, headings, children }) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="ui-toolbar items-start">
        <div>
          <Link
            to={ROUTES.DOCS}
            className="text-xs text-[var(--muted)] hover:underline"
          >
            ← Documentation
          </Link>
          <h2 className="text-xl font-semibold text-[var(--ires-navy-blue)] mt-1">
            {section.title}
          </h2>
          <p className="text-sm text-[var(--muted)] mt-1 max-w-2xl">
            {section.summary}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[220px_minmax(0,1fr)] gap-5 items-start">
        <nav className="ui-card p-4 xl:sticky xl:top-4 space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)] mb-2">
            On this page
          </p>
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className="block rounded-md px-2.5 py-1.5 text-sm text-[var(--ires-navy-blue)] hover:bg-[var(--cool-blue-tint)]"
            >
              {heading.title}
            </a>
          ))}
        </nav>

        <article className="ui-card p-5 sm:p-6 space-y-8 docs-article">
          {children}
        </article>
      </div>
    </div>
  );
};

export default DocsLayout;
