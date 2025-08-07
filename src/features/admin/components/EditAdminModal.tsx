import React, { useState, useEffect } from "react";
import PencilIcon from "@/shared/assets/icons/pencil.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";
import DropdownIcon from "@/shared/assets/icons/dropdown.svg";
import { SingleFileUpload } from "@/shared/components/SingleFileUpload";
import { CREATABLE_USER_ROLES, getRoleDisplayName } from "@/shared/types/roles";
import type { CreatableUserRole } from "@/shared/types/roles";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: CreatableUserRole;
  status: string;
  avatar?: string;
}

interface Props {
  user: User;
  onClose: () => void;
  onSave: (user: User) => void;
}

const EditAdminModal: React.FC<Props> = ({ user, onClose, onSave }) => {
  const [form, setForm] = useState<User>({
    ...user,
    avatar: user.avatar || undefined,
  });
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!form.firstName.trim()) e.firstName = "First name required";
    if (!form.lastName.trim()) e.lastName = "Last name required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.role.trim()) e.role = "Role required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        let avatarUrl: string | undefined = form.avatar;
        
        // Upload to Cloudinary if a new file is selected
        if (selectedAvatarFile) {
          const { uploadFileToCloudinary } = await import('@/shared/utils/cloudinaryUpload');
          const result = await uploadFileToCloudinary(selectedAvatarFile, 'dashboard/admin-avatars');
          if (result.success && result.url) {
            avatarUrl = result.url;
          } else {
            throw new Error(result.error || 'Upload failed');
          }
        }

        // Call the parent handler with the updated data
        onSave({
          ...form,
          avatar: avatarUrl,
        });

        onClose();
      } catch (error) {
        console.error('Error uploading file:', error);
        setErrors(prev => ({ ...prev, avatar: 'Failed to upload image' }));
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
          <h2 className="text-xl font-semibold text-center">Edit Admin</h2>
          <img src={PencilIcon} alt="Edit Admin" className="w-5 h-6" />
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
          <div className="flex flex-col items-center space-y-5">
            <div className="w-[70%]">
              <input
                type="text"
                name="firstName"
                className={`w-full rounded-xl bg-[#D9D9D9]/70 px-4 py-2 focus:outline-none ${
                  errors.firstName ? "border border-red-500" : ""
                }`}
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div className="w-[70%]">
              <input
                type="text"
                name="lastName"
                className={`w-full rounded-xl bg-[#D9D9D9]/70 px-4 py-2 focus:outline-none ${
                  errors.lastName ? "border border-red-500" : ""
                }`}
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
            <div className="w-[70%] mb-2">
              <input
                type="email"
                name="email"
                className={`w-full rounded-xl bg-[#D9D9D9]/70 px-4 py-2 focus:outline-none ${
                  errors.email ? "border border-red-500" : ""
                }`}
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Avatar Upload */}
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
                name="role"
                className={`w-full rounded-xl bg-[#D9D9D9]/70 px-4 py-2 pr-8 focus:outline-none appearance-none ${
                  errors.role ? "border border-red-500" : ""
                }`}
                value={form.role}
                onChange={handleChange}
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
                className="rounded-full px-8 py-2 bg-[var(--ires-dark-blue)] text-white hover:bg-[var(--ires-navy-blue)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdminModal;
