import React, { useState, useEffect } from "react";
import PencilIcon from "@/shared/assets/icons/pencil.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";
import DropdownIcon from "@/shared/assets/icons/dropdown.svg";
import ImageClicker from "@/shared/assets/icons/Upload.svg";
import Trash from "@/shared/assets/icons/delete.svg";
import type { ResponderProfile } from "@/features/responders/services/respondersService";

interface EditResponderData extends Omit<ResponderProfile, 'avatar'> {
  avatarFile?: File | null;
}

interface Props {
  responder: ResponderProfile;
  onClose: () => void;
  onSave: (responder: EditResponderData) => void;
}

const EditResponderModal: React.FC<Props> = ({ responder, onClose, onSave }) => {
  const [form, setForm] = useState<EditResponderData>({
    ...responder,
    avatarFile: null,
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(responder.avatar?.url || null);
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
      setForm((prev) => ({ ...prev, avatarFile: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearAvatar = () => {
    setForm((prev) => ({ ...prev, avatarFile: null }));
    setAvatarPreview(responder.avatar?.url || null);
  };

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!form.firstName.trim()) e.firstName = "First name required";
    if (!form.lastName.trim()) e.lastName = "Last name required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.role) e.role = "Role required";
    if (form.avatarFile) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(form.avatarFile.type)) {
        e.avatar = "Please upload a valid image (JPEG, PNG, or GIF)";
      } else if (form.avatarFile.size > 5 * 1024 * 1024) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-lg p-6 w-full max-w-xl">
        <div className="flex justify-center items-center space-x-2 mb-6">
          <h2 className="text-lg font-semibold">Edit Responder</h2>
          <img src={PencilIcon} alt="" className="h-5" />
        </div>
        <img
          src={CloseIcon}
          alt="close"
          onClick={onClose}
          className="absolute right-3 top-3 h-4 w-4 cursor-pointer"
        />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="mt-1 w-full rounded bg-gray-100 p-2"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="mt-1 w-full rounded bg-gray-100 p-2"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs">{errors.lastName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full rounded bg-gray-100 p-2"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
          <div className="relative">
            <label className="block text-sm font-medium">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="mt-1 w-full rounded bg-gray-100 p-2 pr-8 appearance-none"
            >
              <option value="">Select…</option>
              <option value="RESPONDER_TIER_1">Tier 1</option>
              <option value="RESPONDER_TIER_2">Tier 2</option>
            </select>
            <img
              src={DropdownIcon}
              className="h-3 absolute right-3 top-9 pointer-events-none"
            />
            {errors.role && (
              <p className="text-red-500 text-xs">{errors.role}</p>
            )}
          </div>

          {/* Avatar Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Avatar</label>
            <div className="relative bg-gray-100 p-2 rounded">
              <div className="relative flex items-center">
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
                <p className="text-xs ml-3">
                  {form.avatarFile ? form.avatarFile.name : "No file chosen"}
                </p>
              </div>
            </div>
            {errors.avatar && (
              <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>
            )}
          </div>

          {/* Avatar Preview */}
          {avatarPreview && (
            <div className="flex flex-col items-center">
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-20 h-20 rounded-full object-cover mt-2"
              />
              <button
                type="button"
                onClick={handleClearAvatar}
                className="mt-2 flex items-center text-red-600 text-sm hover:underline"
              >
                <img
                  src={Trash}
                  alt="Remove Avatar"
                  className="w-3 h-3 mr-1"
                />
                Remove Avatar
              </button>
            </div>
          )}
          <button
            type="submit"
            className="block mx-auto bg-[var(--ires-dark-blue)] text-white rounded-full px-6 py-2"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditResponderModal;