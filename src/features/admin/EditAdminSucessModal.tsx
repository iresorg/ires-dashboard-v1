import React from "react";
import Admin from "@/shared/assets/icons/adminusers.svg";
import Shield from "@/shared/assets/icons/Shield.svg";
import CheckBox from "@/shared/assets/icons/Checkboxes.svg";
import close from "@/shared/assets/icons/close.svg";

interface EditAdminSuccessModalProps {
  onClose: () => void;
  firstName: string;
  lastName: string;
  role: string;
}

const EditAdminSuccessModal: React.FC<EditAdminSuccessModalProps> = ({
  onClose,
  firstName,
  lastName,
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
        <div className="flex flex-col ml-20">
          <div className="flex">
            <p className="text-[var(--heading)] font-bold">Admin Updated Successfully</p>
            <img src={CheckBox} alt="Success Icon" className="-mt-3 -ml-2" />
          </div>
          <div className="flex">
            <div className="flex flex-col mr-2">
              <img src={Admin} alt="" className="ui-icon-adaptive h-5 w-5 mb-5" />
              <img src={Shield} alt="" className="ui-icon-adaptive h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <p className="text-[var(--heading)] font-bold mb-3">
                Full name:{" "}
                <span className="text-[var(--foreground)] font-extralight">
                  {firstName} {lastName}
                </span>
              </p>
              <p className="text-[var(--heading)] font-bold">
                Role: <span className="text-[var(--foreground)] font-extralight">{role}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAdminSuccessModal;