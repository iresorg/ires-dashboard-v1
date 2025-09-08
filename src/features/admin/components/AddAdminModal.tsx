import React, { useEffect, useState } from "react";
import PencilIcon from "@/shared/assets/icons/pencil.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";
import DropdownIcon from "@/shared/assets/icons/dropdown.svg";
import { SingleFileUpload } from "@/shared/components/SingleFileUpload";
import { CREATABLE_USER_ROLES, getRoleDisplayName } from "@/shared/types/roles";
import type { CreatableUserRole } from "@/shared/types/roles";
import type { CreateUserPayload } from "@/features/users/services/userService";

interface AddAdminModalProps {
  onClose: () => void;
  onAddAdmin: (newAdmin: CreateUserPayload) => void;
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({ onClose, onAddAdmin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<CreatableUserRole | "">("");
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const handleAvatarSelect = (file: File) => {
    setSelectedAvatarFile(file);
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.avatar;
      return newErrors;
    });
  };

  const handleAvatarRemove = () => {
    setSelectedAvatarFile(null);
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.avatar;
      return newErrors;
    });
  };

  const handleAvatarError = (error: string) => {
    setErrors(prev => ({ ...prev, avatar: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        onAddAdmin({
          firstName,
          lastName,
          email,
          role: role as CreatableUserRole,
          avatarFile: selectedAvatarFile ?? undefined,
        });

        // Reset form
        setFirstName("");
        setLastName("");
        setEmail("");
        setRole("");
        setSelectedAvatarFile(null);
        setErrors({});
      } finally {
        setIsSubmitting(false);
      }
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
      <div
        className="relative z-10 bg-white rounded-lg shadow-md px-6 py-12 w-full max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row justify-center mb-6 space-x-1">
          <h2 className="text-xl font-semibold text-center">Add Admin</h2>
          <img src={PencilIcon} alt="Add Admin" className="w-5 h-6" />
        </div>
        <div className="absolute top-2 right-2 cursor-pointer">
          <img
            src={CloseIcon}
            alt="Close/Cancel"
            onClick={onClose}
            className="w-4 h-4"
          />
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-5 flex flex-col justify-center items-center">
            <div className="w-[70%]">
              <input
                type="text"
                className={`w-[100%] rounded-xl bg-[#D9D9D9]/70  px-4 py-2 focus:outline-none ${
                  errors.firstName ? "border border-red-500" : ""
                }`}
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div className="w-[70%]">
              <input
                type="text"
                className={`w-[100%] rounded-xl bg-[#D9D9D9]/70  px-4 py-2 focus:outline-none ${
                  errors.lastName ? "border border-red-500" : ""
                }`}
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
            <div className="w-[70%] mb-2">
              <input
                type="email"
                className={`w-[100%] rounded-xl bg-[#D9D9D9]/70  px-4 py-2 focus:outline-none ${
                  errors.email ? "border border-red-500" : ""
                }`}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="w-[70%]">
              <SingleFileUpload
                label="Upload agent avatar"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                maxSize={5}
                onFileSelect={handleAvatarSelect}
                onFileRemove={handleAvatarRemove}
                onUploadError={handleAvatarError}
                placeholder="No file chosen"
                showPreview={true}
                selectedFile={selectedAvatarFile}
              />
              {errors.avatar && (
                <p className="text-red-500 text-sm mt-1 break-words">{errors.avatar}</p>
              )}
            </div>
            <div className="relative w-[70%]">
              <select
                className={`w-full rounded-xl bg-[#D9D9D9]/70  px-4 py-2 pr-8 focus:outline-none appearance-none ${
                  errors.role ? "border border-red-500" : ""
                }`}
                value={role}
                onChange={(e) => setRole(e.target.value as CreatableUserRole)}
              >
                <option value="" disabled className="hidden">
                  -Role-
                </option>
                {CREATABLE_USER_ROLES.map((roleOption) => (
                  <option key={roleOption} value={roleOption} className="bg-white">
                    {getRoleDisplayName(roleOption)}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <img src={DropdownIcon} alt="dropdown" className="h-3 w-3" />
              </div>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full px-8 py-2 bg-[var(--ires-dark-blue)] text-white hover:bg-[var(--ires-navy-blue)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? 'Adding...' : 'Add Admin'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdminModal;