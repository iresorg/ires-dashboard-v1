import React, { useEffect } from "react";

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
    ? `This action is irreversible. Delete ${userName} permanently?`
    : `Are you sure you want to ${type} ${userName}?`;

  const confirmLabel = isDelete ? "Confirm ❌" : "Confirm 🔒";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Dimmed blur background */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal box */}
      <div
        className="relative z-10 bg-white rounded-lg shadow-lg px-6 py-8 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-center mb-4">{message}</h3>

        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-6 py-2 rounded-full text-white ${
              isDelete
                ? "bg-red-600 hover:bg-red-700"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
