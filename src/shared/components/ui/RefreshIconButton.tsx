import React from "react";
import { RefreshCw } from "lucide-react";
import Tooltip from "@/shared/components/ui/Tooltip";

interface RefreshIconButtonProps {
  onClick: () => void;
  loading?: boolean;
  label?: string;
  className?: string;
}

/** Icon-only refresh for list pages. Prefer this over a full browser reload. */
const RefreshIconButton: React.FC<RefreshIconButtonProps> = ({
  onClick,
  loading = false,
  label = "Refresh",
  className = "",
}) => (
  <Tooltip content={label} side="bottom">
    <button
      type="button"
      aria-label={label}
      disabled={loading}
      onClick={onClick}
      className={`ui-icon-btn !w-10 !h-10 disabled:opacity-50 ${className}`.trim()}
    >
      <RefreshCw
        className={`h-4 w-4 text-[var(--heading)] ${loading ? "animate-spin" : ""}`}
      />
    </button>
  </Tooltip>
);

export default RefreshIconButton;
