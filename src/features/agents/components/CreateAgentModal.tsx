import React, { useEffect, useState } from "react";
import PencilIcon from "@/shared/assets/icons/pencil.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";

interface CreateAgentModalProps {
  onClose: () => void;
  onSubmit: (data: { firstName: string; lastName: string; email: string }) => void;
}

const CreateAgentModal: React.FC<CreateAgentModalProps> = ({ onClose, onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; email?: string }>({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const validateForm = () => {
    const newErrors: { firstName?: string; lastName?: string; email?: string } = {};
    let isValid = true;

    if (!firstName.trim()) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Valid email is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ firstName, lastName, email });
      setFirstName("");
      setLastName("");
      setEmail("");
      setErrors({});
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="create-agent-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative z-10 bg-white rounded-xl shadow-lg px-8 py-10 w-[550px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-4 right-4 cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          <img src={CloseIcon} alt="Close" className="h-4 w-4" />
        </button>
        <div className="flex items-center justify-center mb-8">
          <h2
            id="create-agent-modal-title"
            className="text-2xl font-bold text-center"
          >
            Create Agent
          </h2>
          <img src={PencilIcon} alt="Add" className="w-5 h-5 ml-2" />
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex items-center space-x-6">
            <label className="w-32 text-right text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              className="flex-1 rounded-lg bg-gray-200 px-4 py-2 focus:outline-none"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          {errors.firstName && (
            <p
              style={{
                color: "red",
                marginTop: "-1rem",
                marginLeft: "9.5rem",
                fontSize: "0.75rem",
              }}
            >
              {errors.firstName}
            </p>
          )}
          <div className="flex items-center space-x-6">
            <label className="w-32 text-right text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              className="flex-1 rounded-lg bg-gray-200 px-4 py-2 focus:outline-none"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          {errors.lastName && (
            <p
              style={{
                color: "red",
                marginTop: "-1rem",
                marginLeft: "9.5rem",
                fontSize: "0.75rem",
              }}
            >
              {errors.lastName}
            </p>
          )}
          <div className="flex items-center space-x-6">
            <label className="w-32 text-right text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="flex-1 rounded-lg bg-gray-200 px-4 py-2 focus:outline-none"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.email && (
            <p
              style={{
                color: "red",
                marginTop: "-1rem",
                marginLeft: "9.5rem",
                fontSize: "0.75rem",
              }}
            >
              {errors.email}
            </p>
          )}
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