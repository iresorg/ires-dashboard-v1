import React, { useEffect, useState } from "react";
import PencilIcon from '@/shared/assets/icons/pencil.svg';
import CloseIcon from '@/shared/assets/icons/close.svg';
import DropdownIcon from '@/shared/assets/icons/dropdown.svg';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface Props {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

const EditAdminModal: React.FC<Props> = ({ user, onClose, onSave }) => {
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background blur */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal box */}
      <div
        className="relative z-10 bg-white p-6 rounded-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <div className="flex flex-row justify-center mb-6 space-x-1">
          <h2 className="text-xl font-semibold text-center">Edit Admin</h2>
          <img src={PencilIcon} alt="Add Admin " className="w-5 h-6" />
        </div>

        {/* Close Icon */}
        <div className="absolute top-2 right-2 cursor-pointer">
          <img src={CloseIcon} alt="Close/Cancel" onClick={onClose} className="w-4 h-4" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name */ }
          <div className="flex flex-row space-x-3">
            <label className="text-gray-700 mb-1 w-1/3 text-right">First Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full rounded-lg bg-gray-200 px-4 py-2 focus:outline-none"
            />
          </div>

          {/* Last Name */ }
          <div className="flex flex-row space-x-3">
            <label className="text-gray-700 mb-1 w-1/3 text-right">Last Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full rounded-lg bg-gray-200 px-4 py-2 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-row space-x-3">
            <label className="text-gray-700 mb-1 w-1/3 text-right">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-lg bg-gray-200 px-4 py-2 focus:outline-none"
            />
          </div>

          {/* Role */}
          <div className="flex flex-row space-x-3">
            <label className="text-gray-700 mb-1 w-1/3 text-right">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-lg bg-gray-200 px-4 py-2 focus:outline-none appearance-none"
            >
              <option value="" disabled selected className="hidden">-Select-</option>
              <option value="Agent Admin" className="bg-white">Agent Admin</option>
              <option value="Responder Admin" className="bg-white">Responder Admin</option>
              <option value="Super Admin" className="bg-white">Super Admin</option>
            </select>
            {/* Dropdown Icon */}
            <div className="absolute right-10 top-68 pointer-events-none">
              <img src={DropdownIcon} alt="dropdown" className="h-3 w-3" />
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="rounded-full px-8 py-2 bg-[var(--ires-dark-blue)] text-white rounded hover:bg-[var(--ires-navy-blue)]"
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
