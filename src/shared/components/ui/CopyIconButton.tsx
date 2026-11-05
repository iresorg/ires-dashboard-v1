import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import Tooltip from "@/shared/components/ui/Tooltip";
import { useToast } from "@/shared/components/ui/useToast";

interface CopyIconButtonProps {
  value: string;
  label?: string;
  className?: string;
}

/** Icon button that copies `value` to the clipboard. */
const CopyIconButton: React.FC<CopyIconButtonProps> = ({
  value,
  label = "Copy",
  className = "",
}) => {
  const { showSuccess, showError } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = value.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showSuccess("Copied", text);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      showError("Could not copy");
    }
  };

  return (
    <Tooltip content={copied ? "Copied" : label} side="bottom">
      <button
        type="button"
        aria-label={label}
        onClick={() => void handleCopy()}
        className={`ui-icon-btn !w-8 !h-8 shrink-0 ${className}`.trim()}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-[var(--heading)]" />
        ) : (
          <Copy className="h-3.5 w-3.5 text-[var(--heading)]" />
        )}
      </button>
    </Tooltip>
  );
};

export default CopyIconButton;
