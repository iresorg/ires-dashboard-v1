import React, { useEffect, useState } from "react";
import PencilIcon from "@/shared/assets/icons/pencil.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";
import DropdownIcon from "@/shared/assets/icons/dropdown.svg";
import ImageClicker from "@/shared/assets/icons/Upload.svg";
import Trash from "@/shared/assets/icons/delete.svg";

interface AddAdminModalProps {
  onClose: () => void;
  onAddAdmin: (newAdmin: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatar?: string; // Add avatar to the interface
  }) => void;
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({ onClose, onAddAdmin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null); // State for avatar (base64 string)
  const [avatarFile, setAvatarFile] = useState<File | null>(null); // State for file object
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
    if (avatarFile) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(avatarFile.type)) {
        newErrors.avatar = "Please upload a valid image (JPEG, PNG, or GIF)";
      } else if (avatarFile.size > 5 * 1024 * 1024) {
        newErrors.avatar = "Image size must be less than 5MB";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string); // Store base64 string for preview
      };
      reader.readAsDataURL(file);
    } else {
      setAvatar(null);
      setAvatarFile(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onAddAdmin({
        firstName,
        lastName,
        email,
        role,
        avatar: avatar || undefined, // Pass avatar as base64 string or undefined
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setRole("");
      setAvatar(null);
      setAvatarFile(null);
      setErrors({});
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
              className={`w-full rounded-xl bg-[#D9D9D9]/70  px-4 py-2 pr-8 focus:outline-none appearance-none ${
                errors.role ? "border border-red-500" : ""
              }`}
              value={role}
              onChange={(e) => setRole(e.target.value)}
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
              Add Admin
            </button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdminModal;