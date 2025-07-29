import React, { useState, useEffect } from "react";
import PencilIcon from "@/shared/assets/icons/pencil.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";
import DropdownIcon from "@/shared/assets/icons/dropdown.svg";

export interface Agent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: "Active" | "Inactive";
}

interface Props {
  agent: Agent;
  onClose: () => void;
  onSave: (agent: Agent) => void;
}

const EditAgentModal: React.FC<Props> = ({ agent, onClose, onSave }) => {
  const [form, setForm] = useState<Agent>(agent);
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

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!form.firstName.trim()) e.firstName = "First name required";
    if (!form.lastName.trim()) e.lastName = "Last name required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.status) e.status = "Status required";
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
          <h2 className="text-lg font-semibold">Edit Agent</h2>
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
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="mt-1 w-full rounded bg-gray-100 p-2 pr-8 appearance-none"
            >
              <option value="">Select…</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <img
              src={DropdownIcon}
              className="h-3 absolute right-3 top-9 pointer-events-none"
            />
            {errors.status && (
              <p className="text-red-500 text-xs">{errors.status}</p>
            )}
          </div>
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

export default EditAgentModal;