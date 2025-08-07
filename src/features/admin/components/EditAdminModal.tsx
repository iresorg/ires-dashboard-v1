import React, { useState, useEffect } from "react";
import PencilIcon from "@/shared/assets/icons/pencil.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";
import DropdownIcon from "@/shared/assets/icons/dropdown.svg";
import ImageClicker from "@/shared/assets/icons/Upload.svg";
import Trash from "@/shared/assets/icons/delete.svg";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
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
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user.avatar || null
  );
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setForm((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    setForm((prev) => ({ ...prev, avatar: undefined }));
  };

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!form.firstName.trim()) e.firstName = "First name required";
    if (!form.lastName.trim()) e.lastName = "Last name required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.role.trim()) e.role = "Role required";
    if (avatarFile) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(avatarFile.type)) {
        e.avatar = "Please upload a valid image (JPEG, PNG, or GIF)";
      } else if (avatarFile.size > 5 * 1024 * 1024) {
        e.avatar = "Image size must be less than 5MB";
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) {
      onSave(form);
      onClose();
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
              <label
                htmlFor="avatar"
                className="block text-sm font-medium mb-1 text-[#000000]/70"
              >
                Upload agent avatar
              </label>
              <div className="relative bg-[#D9D9D9]/70 p-2 rounded-xl">
                <div className="relative flex items-center space-x-2">
                  <input
                    type="file"
                    id="avatar"
                    accept="image/jpeg,image/png,image/gif"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                  />
                  <button
                    type="button"
                    className={`w-[40%] rounded-lg flex flex-row items-center bg-white pl-3 py-1 h-7 mr-15 text-left text-gray-700 ${
                      errors.avatar ? "border border-red-500" : ""
                    }`}
                  >
                    <img
                      src={ImageClicker}
                      alt="Upload Icon"
                      className="h-4 w-4 mr-3"
                    />
                    <p className="text-xs">Upload File</p>
                  </button>
                  <p className="text-xs">
                    {avatarFile ? avatarFile.name : "No file chosen"}
                  </p>
                  {avatarFile && (
                    <img
                      src={Trash}
                      alt="Remove"
                      onClick={handleClearAvatar}
                      className="h-4 w-4 cursor-pointer"
                    />
                  )}
                </div>
              </div>
              {errors.avatar && (
                <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>
              )}
            </div>

            {avatarPreview && (
              <div className="w-[70%] flex flex-col items-center">
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="w-20 h-20 rounded-full object-cover mt-2"
                />
              </div>
            )}

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

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="rounded-full px-8 py-2 bg-[var(--ires-dark-blue)] text-white hover:bg-[var(--ires-navy-blue)]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdminModal;
