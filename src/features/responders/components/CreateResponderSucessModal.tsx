import React from "react";
import Hear from "@/shared/assets/icons/hear.svg";
import CheckBox from "@/shared/assets/icons/Checkboxes.svg";
import close from "@/shared/assets/icons/close.svg";

interface CreateResponderSucessModalProps {
  onClose: () => void;
  id: string; 
  role: string;
}

const CreateResponderSucessModal: React.FC<CreateResponderSucessModalProps> = ({
  onClose,
  id,
  role,
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
            <p className="text-[var(--heading)] font-bold">
              Responder Created Successfully
            </p>
            <img src={CheckBox} alt="Success Icon" className="-mt-3 -ml-2" />
          </div>
          <div className="flex">
            <div className="flex flex-col mr-2">
              <img src={Hear} alt="" className="ui-icon-adaptive h-5 w-5 mb-4 mt-0" />
            </div>
            <div className="flex flex-col">
              <p className="text-[var(--heading)] font-bold mb-2">
                Responder ID:{" "}
                <span className="text-[var(--foreground)] font-normal">{id}</span>
              </p>
            </div>
          </div>
          <div>
            <p className="text-[var(--heading)] font-bold">
              Role:{" "}
              <span className="text-[var(--foreground)] font-extralight">
                {role === "RESPONDER_TIER_1" ? "Tier 1" : "Tier 2"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateResponderSucessModal;
