import React, { useEffect } from "react";
import CloseIcon from "@/shared/assets/icons/close.svg";

interface Props {
  type: "create" | "deactivate" | "activate" | "delete";
  userName: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmAgentModal: React.FC<Props> = ({
  type,
  userName,
  onConfirm,
  onClose,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const isDelete = type === "delete";
  const message =
    type === "create"
      ? `Do you want to create agent ${userName}?`
      : isDelete
      ? `Do you want to delete ${userName} permanently?`
      : `Are you sure you want to ${type} ${userName}?`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative z-10 ui-card text-[var(--foreground)] px-6 py-8 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-3 right-3"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img src={CloseIcon} alt="" className="ui-icon-adaptive h-4 w-4" />
        </button>
        <div className="text-center px-4">
          <h3
            id="confirm-modal-title"
            className="text-lg font-semibold text-[var(--heading)] mb-2"
          >
            {message}
          </h3>
          {isDelete && (
            <p className="text-sm text-[var(--muted)] mb-2">
              This action is irreversible
            </p>
          )}
        </div>
        <div className="flex justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={onConfirm}
            className={isDelete ? "ui-btn-danger" : "ui-btn-primary"}
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ui-action-btn h-10 px-4"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAgentModal;