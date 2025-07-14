import React from "react";
import CloseIcon from "@/shared/assets/icons/close.svg";

interface ConfirmAgentModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmAgentModal: React.FC<ConfirmAgentModalProps> = ({ onConfirm, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div
        className="relative z-10 bg-white rounded-xl shadow-lg px-8 py-10 w-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon */}
        <div className="absolute top-4 right-4 cursor-pointer">
          <img
            src={CloseIcon}
            alt="Close"
            onClick={onClose}
            className="h-4 w-4"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center mb-6">
          Are you sure you want to create a new agent?
        </h2>

        {/* Confirm Button */}
        <div className="flex justify-center space-x-4 mt-6">
        <div className="flex justify-center">
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-tr-lg text-white mr-5 bg-[#0C0E5D] hover:bg-yellow-600"
          >
            Confirm
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-tl-lg bg-[#D9C5C7] text-gray-700 hover:bg-gray-100 ml-5"          >
            Cancel
          </button>
        </div>
        </div>
        </div>
    </div>
  );
};

export default ConfirmAgentModal;