import React, { useState } from "react";

interface FeatureChipsProps {
  features: string[];
  onChange: (features: string[]) => void;
}

const FeatureChips: React.FC<FeatureChipsProps> = ({ features, onChange }) => {
  const [draft, setDraft] = useState("");

  const addFeature = () => {
    const value = draft.trim();
    if (!value) return;
    if (features.includes(value)) {
      setDraft("");
      return;
    }
    onChange([...features, value]);
    setDraft("");
  };

  const removeFeature = (index: number) => {
    onChange(features.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          className="ui-input"
          value={draft}
          placeholder="Type a feature and press Add"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addFeature();
            }
          }}
        />
        <button type="button" className="ui-btn-primary shrink-0" onClick={addFeature}>
          Add
        </button>
      </div>

      {features.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {features.map((feature, index) => (
            <span
              key={`${feature}-${index}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--cool-blue-tint)] text-[var(--ires-navy-blue)] px-3 py-1 text-xs font-medium"
            >
              {feature}
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="text-[var(--muted)] hover:text-[var(--ires-red)]"
                aria-label={`Remove ${feature}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      <p className="text-xs text-[var(--muted)] mt-2">
        Add one feature at a time. Empty list is allowed.
      </p>
    </div>
  );
};

export default FeatureChips;
