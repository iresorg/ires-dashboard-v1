import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes";
import SearchIcon from "@/shared/assets/icons/lineicons_search-2.svg";
import { docsSectionMetas } from "../content";

const DocsIndexPage: React.FC = () => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return docsSectionMetas;
    return docsSectionMetas.filter((section) => {
      const haystack = [
        section.title,
        section.summary,
        ...(section.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="ui-toolbar items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold text-[var(--ires-navy-blue)]">
            Documentation
          </h2>
          <p className="text-sm text-[var(--muted)] mt-1 max-w-2xl">
            Operator guides for tickets, staff, subscriptions, and financials. Visible to all
            logged-in staff.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <img
            src={SearchIcon}
            alt=""
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics…"
            className="ui-input pl-9 w-full"
            aria-label="Search documentation topics"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="ui-card p-8 text-center text-sm text-[var(--muted)]">
          No topics match “{query.trim()}”. Try another keyword.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((section) => (
            <Link
              key={section.id}
              to={`${ROUTES.DOCS}/${section.id}`}
              className="ui-card p-5 hover:border-[var(--ires-navy-blue)] transition-colors group"
            >
              <h3 className="text-base font-semibold text-[var(--ires-navy-blue)] group-hover:underline">
                {section.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                {section.summary}
              </p>
              <span className="mt-4 inline-block text-xs font-medium text-[var(--ires-navy-blue)]">
                Read guide →
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocsIndexPage;
