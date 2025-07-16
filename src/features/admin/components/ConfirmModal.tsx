import React, { useEffect } from "react";
import close from "@/shared/assets/icons/close.svg";

interface ConfirmModalProps {
  type: "deactivate" | "delete";
  userName: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
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
  const message = isDelete
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
        className="relative z-10 bg-white rounded-lg shadow-lg px-6 py-8 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img src={close} alt="Close" className="h-6 w-6 hover:opacity-50" />
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
            onClick={onConfirm}
            className={`px-6 py-2 rounded-tr-lg text-white mr-5 ${
              isDelete
                ? "bg-red-600 hover:bg-red-700"
                : "bg-[#0C0E5D] hover:bg-yellow-600"
            }`}
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-tl-lg bg-[#D9C5C7] text-gray-700 hover:bg-gray-100 ml-5"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
