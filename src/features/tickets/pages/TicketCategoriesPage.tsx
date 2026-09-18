import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTicketCategories } from "../hooks/useTicketCategories";
import CategoryFormModal from "../components/CategoryFormModal";
import { useToast } from "@/shared/components/ui/useToast";
import { ROUTES } from "@/shared/constants/routes";
import { getApiErrorMessage } from "../types";
import type { TicketCategory, TicketSubCategory } from "../types";

/**
 * Categories API returns the full nested catalog (no page/limit).
 * Prefer a dense expandable table + search over pagination / load-more.
 */
const TicketCategoriesPage: React.FC = () => {
  const {
    categories,
    isLoading,
    isSaving,
    error,
    fetchCategories,
    createCategory,
    renameCategory,
    removeCategory,
    addSubCategory,
    renameSubCategory,
    removeSubCategory,
  } = useTicketCategories();
  const { showSuccess, showError, showInfo } = useToast();
  const [showCreate, setShowCreate] = useState(false);
  const [renamingCategory, setRenamingCategory] = useState<TicketCategory | null>(null);
  const [renamingSub, setRenamingSub] = useState<TicketSubCategory | null>(null);
  const [addingSubFor, setAddingSubFor] = useState<TicketCategory | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return categories;
    return categories.filter((category) => {
      if (category.name.toLowerCase().includes(query)) return true;
      return category.subCategories.some((sub) =>
        sub.name.toLowerCase().includes(query)
      );
    });
  }, [categories, search]);

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    setExpandedIds(new Set(filteredCategories.map((category) => category.id)));
  };

  const collapseAll = () => setExpandedIds(new Set());

  const handleCreate = async (payload: { name: string; subCategories?: string[] }) => {
    try {
      await createCategory(payload);
      showSuccess("Category created");
      setShowCreate(false);
    } catch (err) {
      showError(getApiErrorMessage(err, "Could not create category"));
    }
  };

  const handleRenameCategory = async (payload: { name: string }) => {
    if (!renamingCategory) return;
    try {
      await renameCategory(renamingCategory.id, payload.name);
      showSuccess("Category renamed");
      setRenamingCategory(null);
    } catch (err) {
      showError(getApiErrorMessage(err, "Could not rename category"));
    }
  };

  const handleDeleteCategory = async (category: TicketCategory) => {
    const confirmed = window.confirm(
      `Delete "${category.name}"? Tickets using this category will lose the category link.`
    );
    if (!confirmed) return;
    try {
      await removeCategory(category.id);
      showInfo("Category deleted");
    } catch (err) {
      showError(getApiErrorMessage(err, "Could not delete category"));
    }
  };

  const handleAddSub = async (payload: { name: string }) => {
    if (!addingSubFor) return;
    try {
      await addSubCategory(addingSubFor.id, payload.name);
      showSuccess("Sub-category added");
      setAddingSubFor(null);
      setExpandedIds((prev) => new Set(prev).add(addingSubFor.id));
    } catch (err) {
      showError(getApiErrorMessage(err, "Could not add sub-category"));
    }
  };

  const handleRenameSub = async (payload: { name: string }) => {
    if (!renamingSub) return;
    try {
      await renameSubCategory(renamingSub.id, payload.name);
      showSuccess("Sub-category renamed");
      setRenamingSub(null);
    } catch (err) {
      showError(getApiErrorMessage(err, "Could not rename sub-category"));
    }
  };

  const handleDeleteSub = async (sub: TicketSubCategory) => {
    const confirmed = window.confirm(`Delete sub-category "${sub.name}"?`);
    if (!confirmed) return;
    try {
      await removeSubCategory(sub.id);
      showInfo("Sub-category deleted");
    } catch (err) {
      showError(getApiErrorMessage(err, "Could not delete sub-category"));
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="ui-toolbar">
        <div>
          <h2 className="text-xl font-semibold text-[var(--ires-navy-blue)]">
            Ticket categories
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Seed categories before filing tickets.{" "}
            <Link to={ROUTES.TICKETS} className="text-[var(--ires-navy-blue)] underline">
              Back to tickets
            </Link>
          </p>
        </div>
        <button type="button" className="ui-btn-primary" onClick={() => setShowCreate(true)}>
          Create category
        </button>
      </div>

      {error && (
        <div className="ui-card px-4 py-3 text-sm text-[var(--ires-red)] flex items-center justify-between gap-3">
          <span>{error}</span>
          <button type="button" className="ui-action-btn" onClick={fetchCategories}>
            Retry
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="ui-card p-8 text-sm text-[var(--muted)]">Loading categories...</div>
      ) : categories.length === 0 ? (
        <div className="ui-card p-10 text-center">
          <p className="text-base font-medium text-[var(--ires-navy-blue)]">
            No categories yet — create one before tickets can be filed
          </p>
          <p className="text-sm text-[var(--muted)] mt-2">
            Categories power the create-ticket form dropdowns.
          </p>
          <button
            type="button"
            className="ui-btn-primary mt-5"
            onClick={() => setShowCreate(true)}
          >
            Create first category
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <div className="ui-search w-full sm:w-72 min-w-0">
              <input
                type="text"
                placeholder="Search categories or subs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button type="button" className="ui-action-btn" onClick={expandAll}>
              Expand all
            </button>
            <button type="button" className="ui-action-btn" onClick={collapseAll}>
              Collapse all
            </button>
            <p className="text-xs text-[var(--muted)] ml-auto">
              {filteredCategories.length} of {categories.length} categories
            </p>
          </div>

          <div className="ui-table-wrap">
            <table className="ui-table">
              <thead>
                <tr>
                  <th className="w-10"></th>
                  <th>Category</th>
                  <th>Subs</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-[var(--muted)] text-center py-8">
                      No categories match “{search}”.
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => {
                    const isOpen = expandedIds.has(category.id);
                    return (
                      <React.Fragment key={category.id}>
                        <tr>
                          <td>
                            <button
                              type="button"
                              className="ui-icon-btn"
                              aria-label={isOpen ? "Collapse" : "Expand"}
                              onClick={() => toggleExpanded(category.id)}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 20 20"
                                className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                              >
                                <path
                                  d="M5 7l5 5 5-5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  fill="none"
                                />
                              </svg>
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="font-medium text-left hover:underline"
                              onClick={() => toggleExpanded(category.id)}
                            >
                              {category.name}
                            </button>
                          </td>
                          <td className="text-[var(--muted)]">
                            {category.subCategories.length}
                          </td>
                          <td>
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                className="ui-action-btn"
                                onClick={() => setAddingSubFor(category)}
                              >
                                Add sub
                              </button>
                              <button
                                type="button"
                                className="ui-action-btn"
                                onClick={() => setRenamingCategory(category)}
                              >
                                Rename
                              </button>
                              <button
                                type="button"
                                className="ui-action-btn ui-action-danger"
                                onClick={() => handleDeleteCategory(category)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                        {isOpen && (
                          <tr>
                            <td colSpan={4} className="bg-[#f8f9fd]">
                              {category.subCategories.length === 0 ? (
                                <p className="text-sm text-[var(--muted)] py-1">
                                  No sub-categories yet.
                                </p>
                              ) : (
                                <div className="flex flex-wrap gap-2 py-1">
                                  {category.subCategories.map((sub) => (
                                    <span
                                      key={sub.id}
                                      className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--ires-navy-blue)]"
                                    >
                                      {sub.name}
                                      <button
                                        type="button"
                                        className="text-[var(--muted)] hover:text-[var(--ires-navy-blue)]"
                                        onClick={() => setRenamingSub(sub)}
                                        title="Rename"
                                      >
                                        ✎
                                      </button>
                                      <button
                                        type="button"
                                        className="text-[var(--muted)] hover:text-[var(--ires-red)]"
                                        onClick={() => handleDeleteSub(sub)}
                                        title="Delete"
                                      >
                                        ×
                                      </button>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showCreate && (
        <CategoryFormModal
          title="Create category"
          allowSubCategories
          isSaving={isSaving}
          onClose={() => setShowCreate(false)}
          onSubmit={handleCreate}
        />
      )}
      {renamingCategory && (
        <CategoryFormModal
          title="Rename category"
          initialName={renamingCategory.name}
          isSaving={isSaving}
          onClose={() => setRenamingCategory(null)}
          onSubmit={handleRenameCategory}
        />
      )}
      {addingSubFor && (
        <CategoryFormModal
          title={`Add sub-category to ${addingSubFor.name}`}
          isSaving={isSaving}
          onClose={() => setAddingSubFor(null)}
          onSubmit={handleAddSub}
        />
      )}
      {renamingSub && (
        <CategoryFormModal
          title="Rename sub-category"
          initialName={renamingSub.name}
          isSaving={isSaving}
          onClose={() => setRenamingSub(null)}
          onSubmit={handleRenameSub}
        />
      )}
    </div>
  );
};

export default TicketCategoriesPage;
