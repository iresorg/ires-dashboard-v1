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

  const getButtonStyle = () => {
    switch (type) {
      case "delete":
        return "bg-red-600 hover:bg-red-700";
      case "deactivate":
        return "bg-yellow-600 hover:bg-yellow-700";
      case "activate":
        return "bg-green-600 hover:bg-green-700";
      default:
        return "bg-[#0C0E5D] hover:bg-yellow-600";
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
  const buttonStyle = getButtonStyle();
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
        className="relative z-10 bg-white rounded-lg shadow-lg px-6 py-8 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 cursor-pointer"
          onClick={onClose}
          disabled={isLoading}
          aria-label="Close modal"
        >
          <img src={close} alt="Close" className={`h-6 w-6 ${isLoading ? 'opacity-50' : 'hover:opacity-50'}`} />
        </button>
        <div className="text-center mx-5">
          <h3
            id="confirm-modal-title"
            className="text-xl font-semibold mb-2 ml-5 mr-5"
          >
            {message}
          </h3>
          {isDelete && (
            <p className="text-sm text-[#000000] font-bold opacity-50 mb-4">
              This action is irreversible
            </p>
          )}
        </div>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`px-6 py-2 rounded-tr-lg text-white mr-5 ${buttonStyle} disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer`}
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {isLoading ? getLoadingText() : 'Confirm'}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-2 rounded-tl-lg bg-[#D9C5C7] text-gray-700 hover:bg-gray-100 ml-5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
