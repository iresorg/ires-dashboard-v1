import React from "react";
import edit from "@/shared/assets/icons/edit.svg";
import cancel from "@/shared/assets/icons/cancel.svg";

interface CreateResponderModalProps {
  onClose: () => void;
}

const CreateResponderModal: React.FC<CreateResponderModalProps> = ({
  onClose,
}) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-xl w-full max-w-lg">
      {/* Close Icon */}
      <div className="flex justify-end">
        <img
          src={cancel}
          onClick={onClose}
          className="cursor-pointer h-4 w-4"
        />
      </div>

      {/* Title */}
      <div className="flex items-center justify-center mb-10">
        <h1 className="text-2xl font-bold">Create New Responder</h1>
        <img className="h-6 ml-2" src={edit} />
      </div>

      {/* Form */}
      <div className="flex space-x-6">
        <div className="flex flex-col text-sm font-medium text-gray-700">
          <label className="pb-6 pt-2">First Name</label>
          <label className="pb-6">Last Name</label>
          <label className="pt-1">Tier</label>
        </div>

        <div className="flex flex-col w-full">
          <input className="bg-[#D9D9D9] rounded-xl h-10 mb-4 px-4" />
          <input className="bg-[#D9D9D9] rounded-xl h-10 mb-4 px-4" />
          <select className="bg-[#D9D9D9] rounded-xl h-10 px-4 text-black">
            <option value="" disabled selected>
              -Select-
            </option>
            <option value="Tier 1">Tier 1</option>
            <option value="Tier 2">Tier 2</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <button className="bg-[#0C0E5D] text-white py-2 px-6 rounded-3xl text-sm font-bold">
          Create Responder
        </button>
      </div>
    </div>
  );
};

export default CreateResponderModal;
