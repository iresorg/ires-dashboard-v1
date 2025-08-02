import React, { useEffect, useState } from "react";
import PencilIcon from "@/shared/assets/icons/pencil.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";
import ImageClicker from "@/shared/assets/icons/Upload.svg"; 
import Trash from "@/shared/assets/icons/delete.svg";

interface CreateAgentModalProps {
  onClose: () => void;
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string; 
  }) => void;
}

const CreateAgentModal: React.FC<CreateAgentModalProps> = ({ onClose, onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    avatar?: string;
  }>({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const validateForm = () => {
    const newErrors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      avatar?: string;
    } = {};
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
    if (avatarFile) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(avatarFile.type)) {
        newErrors.avatar = "Please upload a valid image (JPEG, PNG, or GIF)";
        isValid = false;
      } else if (avatarFile.size > 5 * 1024 * 1024) {
        newErrors.avatar = "Image size must be less than 5MB";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        firstName,
        lastName,
        email,
        avatar: avatarPreview || undefined,
      });
      setFirstName("");
      setLastName("");
      setEmail("");
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
          <h2 className="text-xl font-semibold text-center">Create Agent</h2>
          <img src={PencilIcon} alt="Create Agent" className="w-5 h-6" />
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
                className={`w-full rounded-xl bg-[#D9D9D9]/70 px-4 py-2 focus:outline-none ${
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
                className={`w-full rounded-xl bg-[#D9D9D9]/70 px-4 py-2 focus:outline-none ${
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
                className={`w-full rounded-xl bg-[#D9D9D9]/70 px-4 py-2 focus:outline-none ${
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
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="rounded-full px-8 py-2 bg-[var(--ires-dark-blue)] text-white hover:bg-[var(--ires-navy-blue)]"
              >
                Create Agent
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAgentModal;