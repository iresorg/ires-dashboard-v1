import React, { useEffect } from "react";
import CloseIcon from "@/shared/assets/icons/close.svg";

interface DeletePlanModalProps {
  planName: string;
  isSaving?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const DeletePlanModal: React.FC<DeletePlanModalProps> = ({
  planName,
  isSaving = false,
  onConfirm,
  onClose,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-[var(--ires-dark-blue)]/40" onClick={onClose} />
      <div className="relative z-10 ui-card w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-[var(--ires-navy-blue)]">Delete plan</h2>
            <p className="text-sm text-[var(--muted)] mt-2">
              Delete <span className="font-medium text-[var(--ires-navy-blue)]">{planName}</span>? If people are already subscribed, it will be hidden instead of removed.
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close">
            <img src={CloseIcon} alt="" className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button type="button" className="ui-action-btn h-10 px-4" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="ui-btn-danger" onClick={onConfirm} disabled={isSaving}>
            {isSaving ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePlanModal;
