import React, { useEffect, useState } from "react";
import PencilIcon from "@/shared/assets/icons/pencil.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";

interface CreateAgentModalProps {
  onClose: () => void;
  onSubmit: (firstName: string, lastName: string) => void;
}

const CreateAgentModal: React.FC<CreateAgentModalProps> = ({ onClose, onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string }>({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const validateForm = () => {
    const newErrors: { firstName?: string; lastName?: string } = {};
    let isValid = true;

    if (!firstName.trim()) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(firstName, lastName);
      setFirstName("");
      setLastName("");
      setErrors({});
    }
  };

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
        className="relative z-10 bg-white rounded-xl shadow-lg px-8 py-10 w-[550px]"
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
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-2xl font-bold text-center">Create Agent</h2>
          <img src={PencilIcon} alt="Add" className="w-5 h-5 ml-2" />
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="flex items-center space-x-6">
            <label className="w-32 text-right text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              className="flex-1 rounded-lg bg-gray-200 px-4 py-2 focus:outline-none"
              placeholder=""
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          {errors.firstName && (
            <p style={{ color: "red", marginTop: "-1rem", marginLeft: "9.5rem", fontSize: "0.75rem" }}>
              {errors.firstName}
            </p>
          )}

          {/* Last Name */}
          <div className="flex items-center space-x-6">
            <label className="w-32 text-right text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              className="flex-1 rounded-lg bg-gray-200 px-4 py-2 focus:outline-none"
              placeholder=""
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          {errors.lastName && (
            <p style={{ color: "red", marginTop: "-1rem", marginLeft: "9.5rem", fontSize: "0.75rem" }}>
              {errors.lastName}
            </p>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="bg-[#0C0E5D] text-white px-8 py-2 rounded-full text-sm font-semibold hover:bg-[#06083a]"
            >
              Create Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAgentModal;