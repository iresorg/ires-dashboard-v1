import React, { useEffect, useState } from "react";
import EditIcon from "@/shared/assets/icons/edit.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";
import DropdownIcon from "@/shared/assets/icons/dropdown.svg";
import ImageClicker from "@/shared/assets/icons/Upload.svg"; 
import Trash from "@/shared/assets/icons/delete.svg";

interface CreateResponderModalProps {
  onClose: () => void;
  onCreateResponder: (data: {
    firstName: string;
    lastName: string;
    email: string; // Added email
    tier: string;
    avatar?: string;
  }) => void;
}

const CreateResponderModal: React.FC<CreateResponderModalProps> = ({
  onClose,
  onCreateResponder,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "", // Added email
    tier: "",
    avatar: undefined as string | undefined,
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
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarPreview(base64String);
        setFormData((prev) => ({ ...prev, avatar: base64String }));
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
    if (!formData.email.trim()) {
      e.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      e.email = "Valid email required";
    }
    if (!formData.tier.trim()) e.tier = "Tier required";
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
      onCreateResponder({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        tier: formData.tier,
        avatar: formData.avatar,
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        tier: "",
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
        className="relative z-10 bg-white rounded-lg shadow-md px-6 py-12 w-full max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row justify-center mb-6 space-x-1">
          <h2 className="text-xl font-semibold text-center">Create Responder</h2>
          <img src={EditIcon} alt="Create Responder" className="w-5 h-6" />
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
                className={`w-full rounded-xl bg-[#D9D9D9]/70 px-4 py-2 focus:outline-none ${
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
                className={`w-full rounded-xl bg-[#D9D9D9]/70 px-4 py-2 focus:outline-none ${
                  errors.email ? "border border-red-500" : ""
                }`}
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
             <div className="w-[70%]">
            <label htmlFor="avatar" className="block text-sm font-medium mb-1 text-[#000000]/70">
              Upload agent avatar
            </label>
            <div className="relative bg-[#D9D9D9]/70 p-2 rounded-xl">
              <div className="relative flex">
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
                  <img src={ImageClicker} alt="Upload Icon" className="h-4 w-4 mr-3" />
                  <p className="text-xs">Upload File</p>
                </button>
                <p className="text-xs">{avatarFile ? avatarFile.name : "No file choosen image.png"}</p>
                <img src={Trash} className="h-4 w-4 mt-2"></img>
              </div>
            </div>
          </div>
            <div className="relative w-[70%]">
              <select
                name="tier"
                className={`w-full rounded-xl bg-[#D9D9D9]/70 px-4 py-2 pr-8 focus:outline-none appearance-none ${
                  errors.tier ? "border border-red-500" : ""
                }`}
                value={formData.tier}
                onChange={handleInputChange}
              >
                <option value="" disabled className="hidden">
                  -Tier-
                </option>
                <option className="bg-white">Tier 1</option>
                <option className="bg-white">Tier 2</option>
                <option className="bg-white">Tier 3</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <img src={DropdownIcon} alt="dropdown" className="h-3 w-3" />
              </div>
              {errors.tier && (
                <p className="text-red-500 text-sm mt-1">{errors.tier}</p>
              )}
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="rounded-full px-8 py-2 bg-[var(--ires-dark-blue)] text-white hover:bg-[var(--ires-navy-blue)]"
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