import React, { useEffect, useState } from "react";
import EditIcon from "@/shared/assets/icons/edit.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";
import DropdownIcon from "@/shared/assets/icons/dropdown.svg";
import ImageClicker from "@/shared/assets/icons/Upload.svg";
import Trash from "@/shared/assets/icons/delete.svg"; // this is used in img `src`
import { getStaffEmailError, toLowerEmail } from "@/shared/utils/email";

interface CreateResponderModalProps {
  onClose: () => void;
  onCreateResponder: (data: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatar?: File;
  }) => void;
}

const CreateResponderModal: React.FC<CreateResponderModalProps> = ({
  onClose,
  onCreateResponder,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    avatar: undefined as File | undefined,
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "email" ? toLowerEmail(value) : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarPreview(base64String);
        setFormData((prev) => ({ ...prev, avatar: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    setFormData((prev) => ({ ...prev, avatar: undefined }));
  };

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!formData.firstName.trim()) e.firstName = "First name required";
    if (!formData.lastName.trim()) e.lastName = "Last name required";
    const emailError = getStaffEmailError(formData.email);
    if (emailError) e.email = emailError;
    if (!formData.role.trim()) e.role = "Role required";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onCreateResponder({ ...formData, email: formData.email.trim().toLowerCase() });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        avatar: undefined,
      });
      setAvatarFile(null);
      setAvatarPreview(null);
      setErrors({});
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
        className="relative z-10 ui-card text-[var(--foreground)] px-6 py-12 w-full max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row justify-center mb-6 space-x-1">
          <h2 className="text-xl font-semibold text-center text-[var(--heading)]">
            Create Responder
          </h2>
          <img src={EditIcon} alt="Create Responder" className="ui-icon-adaptive w-5 h-6" />
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
          <div className="flex flex-col items-center space-y-5">
            <div className="w-[70%]">
              <input
                type="text"
                name="firstName"
                className={`ui-input ${
                  errors.firstName ? "border border-red-500" : ""
                }`}
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div className="w-[70%]">
              <input
                type="text"
                name="lastName"
                className={`ui-input ${
                  errors.lastName ? "border border-red-500" : ""
                }`}
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>

            <div className="w-[70%] mb-2">
              <input
                type="email"
                name="email"
                className={`ui-input ${
                  errors.email ? "border border-red-500" : ""
                }`}
                placeholder="name@company.com"
                autoCapitalize="none"
                spellCheck={false}
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Avatar Upload */}
            <div className="w-[70%]">
              <label
                htmlFor="avatar"
                className="block text-sm font-medium mb-1 text-[var(--muted)]"
              >
                Upload avatar
              </label>
              <div className="ui-file-field relative">
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
                    className={`ui-file-field-btn ${
                      errors.avatar ? "border-[var(--ires-red)]" : ""
                    }`}
                  >
                    <img
                      src={ImageClicker}
                      alt=""
                      className="ui-icon-adaptive h-4 w-4 mr-2"
                    />
                    Upload File
                  </button>
                  <p className="text-xs text-[var(--muted)] truncate">
                    {avatarFile ? avatarFile.name : "No file chosen"}
                  </p>
                </div>
              </div>
              {errors.avatar && (
                <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>
              )}
            </div>

            {/* Avatar Preview */}
            {avatarPreview && (
              <div className="w-[70%] flex flex-col items-center">
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
                    className="ui-icon-adaptive w-3 h-3 mr-1"
                  />
                  Remove Avatar
                </button>
              </div>
            )}

            {/* Role Dropdown */}
            <div className="relative w-[70%]">
              <select
                name="role"
                className={`ui-input ${
                  errors.role ? "border border-red-500" : ""
                }`}
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="" disabled className="hidden">
                  -Role-
                </option>
                <option value="RESPONDER_TIER_1">Tier 1</option>
                <option value="RESPONDER_TIER_2">Tier 2</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <img src={DropdownIcon} alt="" className="ui-icon-adaptive h-3 w-3" />
              </div>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="ui-btn-primary"
              >
                Create Responder
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateResponderModal;
