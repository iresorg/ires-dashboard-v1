import React, { useEffect, useState } from "react";
import PencilIcon from "@/shared/assets/icons/pencil.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";
import DropdownIcon from "@/shared/assets/icons/dropdown.svg";
import { SingleFileUpload } from "@/shared/components/SingleFileUpload";
import { CREATABLE_USER_ROLES, getRoleDisplayName } from "@/shared/types/roles";
import type { CreatableUserRole } from "@/shared/types/roles";
import type { CreateUserPayload } from "@/features/users/services/userService";
import { getStaffEmailError, toLowerEmail } from "@/shared/utils/email";

interface AddAdminModalProps {
  onClose: () => void;
  onAddAdmin: (newAdmin: CreateUserPayload) => Promise<void>;
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({ onClose, onAddAdmin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<CreatableUserRole | "">("");
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState("");

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
    const emailError = getStaffEmailError(email);
    if (emailError) {
      newErrors.email = emailError;
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
      setSubmitError("");
      try {
        await onAddAdmin({
          firstName,
          lastName,
          email: email.trim().toLowerCase(),
          role: role as CreatableUserRole,
          avatarFile: selectedAvatarFile ?? undefined,
        });
      } catch (error: unknown) {
        const message =
          (error as { response?: { data?: { message?: string } } })?.response?.data
            ?.message || "Could not create this user. Try again.";
        setSubmitError(message);
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
        onClick={isSubmitting ? undefined : onClose}
      />
      <div
        className="relative z-10 bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-[var(--shadow-card)] px-6 py-10 w-full max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {isSubmitting ? (
          <div className="flex flex-col items-center justify-center py-10 gap-4" role="status">
            <div className="h-10 w-10 rounded-full border-2 border-[var(--border)] border-t-[var(--ires-navy-blue)] animate-spin" />
            <p className="text-base font-semibold text-[var(--heading)]">Creating user</p>
            <p className="text-sm text-[var(--muted)]">Please wait while the account is set up.</p>
          </div>
        ) : (
        <>
        <div className="flex flex-row justify-center mb-6 space-x-1">
          <h2 className="text-xl font-semibold text-center text-[var(--heading)]">Add Admin</h2>
          <img src={PencilIcon} alt="Add Admin" className="ui-icon-adaptive w-5 h-6" />
        </div>
        <div className="absolute top-2 right-2 cursor-pointer">
          <img
            src={CloseIcon}
            alt="Close/Cancel"
            onClick={onClose}
            className="ui-icon-adaptive w-4 h-4"
          />
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-5 flex flex-col justify-center items-center">
            <div className="w-[70%]">
              <input
                type="text"
                className={`ui-input ${errors.firstName ? "border-[var(--ires-red)]" : ""}`}
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
                className={`ui-input ${errors.lastName ? "border-[var(--ires-red)]" : ""}`}
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
                className={`ui-input ${errors.email ? "border-[var(--ires-red)]" : ""}`}
                placeholder="name@company.com"
                value={email}
                autoCapitalize="none"
                spellCheck={false}
                onChange={(e) => setEmail(toLowerEmail(e.target.value))}
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
                className={`ui-input ${
                  errors.role ? "border border-red-500" : ""
                }`}
                value={role}
                onChange={(e) => setRole(e.target.value as CreatableUserRole)}
              >
                <option value="" disabled className="hidden">
                  -Role-
                </option>
                {CREATABLE_USER_ROLES.map((roleOption) => (
                  <option key={roleOption} value={roleOption}>
                    {getRoleDisplayName(roleOption)}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <img src={DropdownIcon} alt="" className="ui-icon-adaptive h-3 w-3" />
              </div>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>
            {submitError && (
              <p className="text-sm text-[var(--ires-red)] text-center w-[70%]">{submitError}</p>
            )}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="ui-btn-primary"
              >
                Add Admin
              </button>
            </div>
          </div>
        </form>
        </>
        )}
      </div>
    </div>
  );
};

export default AddAdminModal;