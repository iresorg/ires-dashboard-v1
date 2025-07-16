import React, { useEffect, useState } from "react";
import PencilIcon from "@/shared/assets/icons/pencil.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";
import DropdownIcon from "@/shared/assets/icons/dropdown.svg";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
}

interface EditAdminModalProps {
  onClose: () => void;
  onSave: (updatedUser: User) => void;
  user: User;
}

const EditAdminModal: React.FC<EditAdminModalProps> = ({
  onClose,
  onSave,
  user,
}) => {
  const [formData, setFormData] = useState<User>(user);

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-row space-x-3">
            <label className="text-gray-700 mb-1 w-1/3 text-right">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-lg bg-gray-200 px-4 py-2 focus:outline-none"
            />
          </div>

          <div className="flex flex-row space-x-3">
            <label className="text-gray-700 mb-1 w-1/3 text-right">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-lg bg-gray-200 px-4 py-2 focus:outline-none"
            />
          </div>

          <div className="flex flex-row space-x-3">
            <label className="text-gray-700 mb-1 w-1/3 text-right">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg bg-gray-200 px-4 py-2 focus:outline-none"
            />
          </div>

          <div className="flex flex-row space-x-3">
            <label className="text-gray-700 mb-1 w-1/3 text-right">Role</label>
            <div className="relative w-full">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-lg bg-gray-200 px-4 py-2 pr-8 focus:outline-none appearance-none"
              >
                <option value="">-Select-</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Agent Admin">Agent Admin</option>
                <option value="Responder Admin">Responder Admin</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <img src={DropdownIcon} alt="dropdown" className="h-3 w-3" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="rounded-full px-8 py-2 bg-[var(--ires-dark-blue)] text-white hover:bg-[var(--ires-navy-blue)]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdminModal;
