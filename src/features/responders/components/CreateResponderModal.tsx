import React, { useEffect, useState } from "react";
import edit from "@/shared/assets/icons/edit.svg";
import close from "@/shared/assets/icons/close.svg";
import DropdownIcon from "@/shared/assets/icons/dropdown.svg";

interface CreateResponderModalProps {
  onClose: () => void;
  onCreateResponder: (data: {
    firstName: string;
    lastName: string;
    tier: string;
  }) => void;
}

const CreateResponderModal: React.FC<CreateResponderModalProps> = ({
  onClose,
  onCreateResponder,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    tier: "",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateResponder(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="max-w-full p-6 bg-white rounded-xl shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={onClose} className="ml-230">
          <img className="hover:opacity-50" src={close} alt="Cancel" />
        </button>
        <div className="ml-60">
          <div className="flex ml-30 mb-10">
            <h1 className="text-2xl font-bold">Create New Responder</h1>
            <img className="h-6 mt-1 ml-1" src={edit} alt="Edit" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <div className="flex flex-col">
                <p className="pb-7 pr-5 pt-2">First Name</p>
                <p className="pb-7">Last Name</p>
                <p className="ml-10">Tier</p>
              </div>
              <div className="flex flex-col">
                <input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="bg-[#D9D9D9] rounded-xl h-10 mb-3 w-90"
                  required
                />
                <input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="bg-[#D9D9D9] rounded-xl h-10 mb-3"
                  required
                />

                <div className="relative">
                  <select
                    name="tier"
                    value={formData.tier}
                    onChange={handleInputChange}
                    className="appearance-none bg-[#D9D9D9] rounded-xl h-10 px-3 pr-10 text-black w-full"
                    required
                  >
                    <option value="" disabled>
                      -Select-
                    </option>
                    <option value="Tier1">Tier 1</option>
                    <option value="Tier2">Tier 2</option>
                  </select>
                  <img
                    src={DropdownIcon}
                    alt="Dropdown Icon"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-[#0C0E5D] text-[#ffffff] p-3 pr-4 pl-4 rounded-3xl mt-10 ml-50 text-sm font-bold"
              >
                Create Responder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateResponderModal;
