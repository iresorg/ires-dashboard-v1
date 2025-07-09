import React from "react";
import edit from "@/shared/assets/icons/edit.svg";
import cancel from "@/shared/assets/icons/cancel.svg";

const CreateResponderModal: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-xl">
      <img className="ml-230"src={cancel}></img>
      <div className="ml-60">
      <div className="flex ml-30 mb-10">
        <h1 className="text-2xl font-bold">Create New Responder</h1>
        <img className="h-6 mt-1 ml-1" src={edit}></img>
      </div>
      <div className="flex">  
        <div className="flex flex-col">
          <p className="pb-7 pr-5 pt-2">First Name</p>
          <p className="pb-7">Last Name</p>
          <p className="ml-10">Tier</p>
        </div>
        <div className="flex flex-col">
          <input className="bg-[#D9D9D9] rounded-xl h-10 mb-3 w-90"/>
          <input className="bg-[#D9D9D9] rounded-xl h-10 mb-3"/>
          <select className="bg-[#D9D9D9] rounded-xl h-10 px-3 text-black">
            <option value="" disabled selected>-Select-</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </div>
      </div>
      <div>
        <button className="bg-[#0C0E5D] text-[#ffffff] p-3 pr-4 pl-4 rounded-3xl mt-10 ml-50 text-sm font-bold">Create Responder</button>
      </div>
      </div>
    </div>
  );
};

export default CreateResponderModal;
