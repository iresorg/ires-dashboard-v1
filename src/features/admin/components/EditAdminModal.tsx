import React, { useEffect, useState } from "react";

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
      <div
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative z-10 bg-white p-6 rounded-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">Edit Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border px-4 py-2 rounded"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border px-4 py-2 rounded"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="Agent Admin">Agent Admin</option>
            <option value="Responder Admin">Responder Admin</option>
            <option value="Super Admin">Super Admin</option>
          </select>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--ires-dark-blue)] text-white rounded"
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
