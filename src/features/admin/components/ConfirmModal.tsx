import React, { useEffect, useState } from "react";
import close from "@/shared/assets/icons/close.svg";

interface ConfirmModalProps {
  type: "deactivate" | "activate" | "delete";
  userName: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  type,
  userName,
  onConfirm,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      // Modal will be closed by parent component after successful action
    } catch (error) {
      console.error('Action failed:', error);
      setIsLoading(false);
      // Keep modal open to show error state
    }
  };

  const getMessage = () => {
    switch (type) {
      case "delete":
        return `Do you want to delete ${userName} permanently?`;
      case "deactivate":
        return `Are you sure you want to deactivate ${userName}?`;
      case "activate":
        return `Are you sure you want to activate ${userName}?`;
      default:
        return `Are you sure you want to ${type} ${userName}?`;
    }
  };

  const getLoadingText = () => {
    switch (type) {
      case "delete":
        return "Deleting...";
      case "deactivate":
        return "Deactivating...";
      case "activate":
        return "Activating...";
      default:
        return "Processing...";
    }
  };

  const message = getMessage();
  const isDelete = type === "delete";

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
          className="absolute top-3 right-3 cursor-pointer"
          onClick={onClose}
          disabled={isLoading}
          aria-label="Close modal"
        >
          <img src={close} alt="" className={`ui-icon-adaptive h-4 w-4 ${isLoading ? 'opacity-50' : ''}`} />
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
            onClick={handleConfirm}
            disabled={isLoading}
            className={`${isDelete ? "ui-btn-danger" : "ui-btn-primary"} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            )}
            {isLoading ? getLoadingText() : "Confirm"}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="ui-action-btn h-10 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
