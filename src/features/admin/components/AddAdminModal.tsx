import React, { useEffect, useState } from "react";
import PencilIcon from "@/shared/assets/icons/pencil.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";
import DropdownIcon from "@/shared/assets/icons/dropdown.svg";
import AddAdminSuccessModal from "./AddAdminSuccessModal";

interface AddAdminModalProps {
  onClose: () => void;
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({ onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [submittedName, setSubmittedName] = useState({ firstName: "", lastName: "" });
  const [submittedRole, setSubmittedRole] = useState({role: ""});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!role) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Store submitted values before resetting
      setSubmittedName({ firstName, lastName });
      setSubmittedRole({ role });
      setShowSuccessPopup(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setRole("");
      setErrors({});
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Dimmed blur background */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal box */}
      <div
        className="relative z-10 bg-white rounded-lg shadow-md px-6 py-12 w-full max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <div className="flex flex-row justify-center mb-6 space-x-1">
          <h2 className="text-xl font-semibold text-center">Add Admin</h2>
          <img src={PencilIcon} alt="Add Admin" className="w-5 h-6" />
        </div>

        {/* Close Icon */}
        <div className="absolute top-2 right-2 cursor-pointer">
          <img
            src={CloseIcon}
            alt="Close/Cancel"
            onClick={onClose}
            className="w-4 h-4"
          />
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="flex flex-row space-x-3">
            <label className="text-gray-700 mb-1 w-1/3 text-right">
              First Name
            </label>
            <div className="w-full">
              <input
                type="text"
                className={`w-full rounded-lg bg-gray-200 px-4 py-2 focus:outline-none ${
                  errors.firstName ? "border border-red-500" : ""
                }`}
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
          </div>

          {/* Last Name */}
          <div className="flex flex-row space-x-3">
            <label className="text-gray-700 mb-1 w-1/3 text-right">
              Last Name
            </label>
            <div className="w-full">
              <input
                type="text"
                className={`w-full rounded-lg bg-gray-200 px-4 py-2 focus:outline-none ${
                  errors.lastName ? "border border-red-500" : ""
                }`}
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-row space-x-3">
            <label className="text-gray-700 mb-1 w-1/3 text-right">Email</label>
            <div className="w-full">
              <input
                type="email"
                className={`w-full rounded-lg bg-gray-200 px-4 py-2 focus:outline-none ${
                  errors.email ? "border border-red-500" : ""
                }`}
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Role Dropdown */}
          <div className="flex flex-row space-x-3">
            <label className="text-gray-700 mb-1 w-1/3 text-right">Role</label>
            <div className="relative w-full">
              <select
                className={`w-full rounded-lg bg-gray-200 px-4 py-2 pr-8 focus:outline-none appearance-none ${
                  errors.role ? "border border-red-500" : ""
                }`}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" disabled className="hidden">
                  -Select-
                </option>
                <option className="bg-white">Super Admin</option>
                <option className="bg-white">Agent Admin</option>
                <option className="bg-white">Responder Admin</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <img src={DropdownIcon} alt="dropdown" className="h-3 w-3" />
              </div>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="rounded-full px-8 py-2 bg-[var(--ires-dark-blue)] text-white hover:bg-[var(--ires-navy-blue)]"
            >
              Create Admin
            </button>
          </div>
        </form>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <AddAdminSuccessModal
          onClose={() => {
            setShowSuccessPopup(false);
            onClose();
          }}
          firstName={submittedName.firstName}
          lastName={submittedName.lastName}
          role={submittedRole.role}
        />
      )}
    </div>
  );
};

export default AddAdminModal;