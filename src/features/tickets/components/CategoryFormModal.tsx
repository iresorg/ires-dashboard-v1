import React, { useEffect, useState } from "react";
import CloseIcon from "@/shared/assets/icons/close.svg";

interface CategoryFormModalProps {
  initialName?: string;
  title: string;
  isSaving?: boolean;
  allowSubCategories?: boolean;
  onClose: () => void;
  onSubmit: (payload: { name: string; subCategories?: string[] }) => Promise<void>;
}

const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  initialName = "",
  title,
  isSaving = false,
  allowSubCategories = false,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState(initialName);
  const [subInput, setSubInput] = useState("");
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const addSub = () => {
    const value = subInput.trim();
    if (!value) return;
    if (subCategories.includes(value)) return;
    setSubCategories((prev) => [...prev, value]);
    setSubInput("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    await onSubmit({
      name: name.trim(),
      ...(allowSubCategories ? { subCategories } : {}),
    });
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-[var(--ires-dark-blue)]/40" onClick={onClose} />
      <div className="relative z-10 ui-card w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] bg-[var(--ires-navy-blue)]">
          <h2 className="text-sm font-semibold text-white">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close">
            <img src={CloseIcon} alt="" className="w-3.5 h-3.5 invert" />
          </button>
        </div>
        <form className="p-5 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-xs font-medium text-[var(--muted)]">Name</span>
            <input
              className="ui-input mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Account takeover"
            />
            {error && <p className="text-xs text-[var(--ires-red)] mt-1">{error}</p>}
          </label>

          {allowSubCategories && (
            <div>
              <span className="text-xs font-medium text-[var(--muted)]">
                Sub-categories (optional)
              </span>
              <div className="mt-1 flex gap-2">
                <input
                  className="ui-input"
                  value={subInput}
                  onChange={(e) => setSubInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSub();
                    }
                  }}
                  placeholder="Type and press Add"
                />
                <button type="button" className="ui-action-btn h-10 px-4" onClick={addSub}>
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {subCategories.map((item) => (
                  <span key={item} className="ui-chip bg-[var(--cool-blue-tint)] text-[var(--ires-navy-blue)]">
                    {item}
                    <button
                      type="button"
                      className="ml-1"
                      onClick={() =>
                        setSubCategories((prev) => prev.filter((value) => value !== item))
                      }
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="ui-action-btn h-10 px-4" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="ui-btn-primary" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryFormModal;
