import React, { useEffect } from "react";
import PencilIcon from '@/shared/assets/icons/pencil.svg';
import CloseIcon from '@/shared/assets/icons/close.svg';
import DropdownIcon from '@/shared/assets/icons/dropdown.svg';

interface AddAdminModalProps {
  onClose: () => void;
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({ onClose }) => {
  // Prevent scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Background blur */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal box */}
      <div
        className="relative z-10 bg-white rounded-lg shadow-md px-6 py-12 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row justify-center mb-6 space-x-1">
          <h2 className="text-xl font-semibold text-center">Add New Admin</h2>
          <img src={PencilIcon} alt="Add Admin " className="w-5 h-6" />
        </div>

        {/* Close Icon */}
        <div className="absolute top-2 right-2 cursor-pointer">
          <img src={CloseIcon} alt="Close/Cancel" onClick={onClose} className="w-4 h-4" />
        </div>

        {/* Sample Form */}

        <form className="space-y-5">
          {/* First Name */}
          <div className="flex flex-row">
            <label className="text-gray-700 mb-1 w-1/3">First Name</label>
            <input type="text" className="w-full rounded-lg bg-gray-200 px-4 py-2 focus:outline-none" placeholder="" />
          </div>

          {/* Last Name */}
          <div className="flex flex-row">
            <label className="text-gray-700 mb-1 w-1/3">Last Name</label>
            <input type="text" className="w-full rounded-lg bg-gray-200 px-4 py-2 focus:outline-none" placeholder="" />
          </div>

          {/* Email */}
          <div className="flex flex-row">
            <label className="text-gray-700 mb-1 w-1/3">Email</label>
            <input type="email" className="w-full rounded-lg bg-gray-200 px-4 py-2 focus:outline-none" placeholder="" />
          </div>

          {/* Role Dropdown */}
          <div className="flex flex-row">
            <label className="text-gray-700 mb-1 w-1/3">Role</label>
            <select className="w-full rounded-lg bg-gray-200 px-4 py-2 focus:outline-none appearance-none">
              <option value="" disabled selected className="hidden">-Select-</option>
              <option className="bg-white">Agent Admin</option>
              <option className="bg-white">Responder Admin</option>
            </select>
            {/* Dropdown Icon */}
            <div className="absolute right-10 top-74 pointer-events-none">
              <img src={DropdownIcon} alt="dropdown" className="h-3 w-3"/>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button type="submit" className="rounded-full px-8 py-2 bg-[var(--ires-dark-blue)] text-white rounded hover:bg-[var(--ires-navy-blue)]">
              Create Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdminModal;
