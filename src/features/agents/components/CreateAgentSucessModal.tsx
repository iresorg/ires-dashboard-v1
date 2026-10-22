import React from "react";
import Agent from "@/shared/assets/icons/agenticon.svg";
import CheckBox from "@/shared/assets/icons/Checkboxes.svg";
import close from "@/shared/assets/icons/close.svg";

interface CreateAgentSucessModalProps {
  onClose: () => void;
  agentName: string;
}

const CreateAgentSucessModal: React.FC<CreateAgentSucessModalProps> = ({
  onClose,
  agentName,
}) => {
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
      <div
        className="relative z-10 ui-card text-[var(--foreground)] px-6 py-12 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img src={close} alt="" className="ui-icon-adaptive h-4 w-4" />
        </button>
        <div className="flex flex-col items-center">
          <div className="flex">
            <p className="text-[var(--heading)] font-bold">Agent Created Successfully</p>
            <img src={CheckBox} alt="Success Icon" className="-mt-3 -ml-2" />
          </div>
          <div className="flex">
            <div className="flex flex-col mr-2">
              <img src={Agent} alt="" className="ui-icon-adaptive h-5 w-5 mb-4 mt-0" />
            </div>
            <div className="flex flex-col">
              <p className="text-[var(--heading)] font-bold mb-9">
                Agent Name: <span className="text-[var(--foreground)] font-normal">{agentName}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAgentSucessModal;