import React, { useEffect } from "react";
import CloseIcon from "@/shared/assets/icons/close.svg";

interface ManageAgentModalProps {
  onClose: () => void;
}

const ManageAgentModal: React.FC<ManageAgentModalProps> = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative bg-white p-6 w-[90%] sm:w-[450px] rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:opacity-50"
        >
          <img src={CloseIcon} alt="Close Modal" />
        </button>
        <h2 className="text-xl font-bold mb-4">Generate Token</h2>
        <p className="text-sm text-gray-600 mb-4">
          (Form fields and logic for generating a token will go here.)
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-[#0C0E5D] text-white px-4 py-2 rounded-full text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ManageAgentModal;
