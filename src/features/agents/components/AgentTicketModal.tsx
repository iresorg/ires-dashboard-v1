import React from "react";
import CloseIcon from "@/shared/assets/icons/close.svg";
import Arrow from "@/shared/assets/icons/dropdown2.svg";
import File from "@/shared/assets/icons/file.svg";
import Image from "@/shared/assets/icons/Image.svg";
import Upload from "@/shared/assets/icons/Upload.svg";
import Trash from "@/shared/assets/icons/delete.svg";
import File2 from "@/shared/assets/icons/file2.svg";
import Image2 from "@/shared/assets/icons/Image2.svg";
import Check from "@/shared/assets/icons/check.svg";

interface Ticket {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

interface AgentTicketModalProps {
  ticket: Ticket | null;
  onClose: () => void;
  isOpen: boolean;
}

const AgentTicketModal: React.FC<AgentTicketModalProps> = ({ ticket, onClose, isOpen }) => {
  const [, setUploadedFiles] = React.useState<string[]>([]);

  if (!isOpen) {
    return null;
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name);
      setUploadedFiles((prev) => [...prev, ...fileNames]);
    }
  };

  return (
    <div className="fixed inset-0 z-50" aria-modal="true" role="dialog">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      <div
        className="fixed right-0 top-0 h-full w-full max-w-xl bg-white shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full px-4 py-3 overflow-y-auto">
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-lg font-semibold bg-[#0C0E5D] text-white px-4 rounded-xl">
                Create a Ticket
              </p>
            </div>
            <div>
              <img
                src={CloseIcon}
                alt="Close"
                onClick={onClose}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
          <div className="-mx-4">
            <hr className="border-0 h-2 bg-[#D4CDCD]/30 w-full mt-3 mb-10" />
          </div>
          <div>
            <p className="bg-[#EBEBEB] w-40 pl-4 py-2 pr-10 rounded-bl-lg rounded-br-lg text-sm text-[#0C0E5D]">
              Ticket Details
            </p>
          </div>
          <div className="space-y-4 mt-3">
            <div className="flex ml-3">
              <p className="block text-sm font-medium text-[#0C0E5D] mr-8">
                Incident Title :
              </p>
              <input
                className="block font-medium ml-1 !border-[#D4CDCD] pr-30 pb-2 -mt-0.5 text-xs text-[#D4CDCD]/100 border rounded-lg"
                defaultValue={ticket?.title || ""}
              />
            </div>
            <div className="flex ml-3">
              <p className="block text-sm font-medium text-[#0C0E5D] mr-3">
                Incident Category :
              </p>
              <div className="flex justify-between bg-[#D9D9D9] w-50 px-3 rounded-sm mb-3.5">
                <p className="mt-0.5 text-sm mb-0.5">-Select-</p>
                <img src={Arrow} alt="Dropdown" />
              </div>
            </div>
            <div
              className="flex justify-between bg-[#EBEBEB] p-2 mb-3 px-5 cursor-pointer rounded-bl-lg rounded-br-lg"
              role="button"
            >
              <p className="block text-sm font-medium text-[#0C0E5D]">
                Ticket Description
              </p>
            </div>
            <div>
              <input
                placeholder="Type here....."
                className="border rounded-md !border-[#D4CDCD] pl-3 pb-23 pr-60 pt-1 text-xs text-[#D4CDCD]/100"
              />
            </div>
            <div
              className="flex justify-between bg-[#EBEBEB] p-2 mb-3 mt-3 px-5 cursor-pointer rounded-bl-lg rounded-br-lg"
              role="button"
            >
              <p className="block text-sm font-medium text-[#0C0E5D]">
                🧩 Materials / Artifacts Logged:
              </p>
            </div>
            <div className="bg-[#F8F3F3]/54 h-35 pt-10 border-dashed border-1 !border-[#616161]/37 rounded-lg">
              <div className="flex justify-center mb-3">
                <img src={Image} alt="Image" />
                <img src={File} alt="File" />
              </div>
              <div>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="fileUpload"
                />
                <label
                  htmlFor="fileUpload"
                  className="flex w-58 bg-[#ffffff] ml-40 pr-0 pl-3 rounded-lg"
                >
                  <img src={Upload} className="mr-5" alt="Upload" />
                  <p className="text-[#0C0E5D] text-sm">Upload Files and Images</p>
                </label>
              </div>
            </div>
            <div>
              <div className="flex bg-[#0C0E5D]/15 pl-3 pt-1 pb-2 rounded-md">
                <img src={File2} className="mr-5" alt="File" />
                <div className="mr-77">
                  <div>
                    <p className="text-sm text-[#0C0E5D]">exampleoffile.pdf</p>
                  </div>
                  <div className="flex">
                    <img src={Check} className="mr-1" alt="Check" />
                    <p className="text-xs text-[#0C0E5D]/49 mr-1">Upload Complete - </p>
                    <p className="text-xs text-[#0C0E5D]/49">1mb</p>
                  </div>
                </div>
                <img src={Trash} className="h-7 w-5 pt-2" alt="Delete" />
              </div>
              <div className="flex bg-[#0C0E5D]/15 pl-3 pt-1 pb-2 rounded-md mt-3">
                <img src={Image2} className="mr-5" alt="Image" />
                <div className="mr-75">
                  <div>
                    <p className="text-sm text-[#0C0E5D]">Image.png or jpg</p>
                  </div>
                  <div className="flex">
                    <img src={Check} className="mr-1" alt="Check" />
                    <p className="text-xs text-[#0C0E5D]/49 mr-1">Upload Complete - </p>
                    <p className="text-xs text-[#0C0E5D]/49">524kb</p>
                  </div>
                </div>
                <img src={Trash} className="h-7 w-5 pt-2" alt="Delete" />
              </div>
            </div>
            <div>
              <div className="flex mb-3">
                <p className="block text-sm font-medium text-[#0C0E5D] mr-3">
                  Links :
                </p>
                <input className="block font-medium ml-1 !border-[#D4CDCD] pr-30 pb-2 -mt-0.5 text-xs text-[#D4CDCD]/100 border rounded-lg" />
              </div>
              <div className="flex mb-3">
                <p className="block text-sm font-medium text-[#0C0E5D] mr-3">
                  Date of Incident :
                </p>
                <input className="block font-medium ml-1 !border-[#D4CDCD] pr-30 pb-2 -mt-0.5 text-xs text-[#D4CDCD]/100 border rounded-lg" />
              </div>
              <div className="flex mb-3">
                <p className="block text-sm font-medium text-[#0C0E5D] mr-3">
                  Time of Incident :
                </p>
                <input className="block font-medium ml-1 !border-[#D4CDCD] pr-30 pb-2 -mt-0.5 text-xs text-[#D4CDCD]/100 border rounded-lg" />
              </div>
              <div className="flex mb-3">
                <p className="block text-sm font-medium text-[#0C0E5D] mr-3">
                  Client's name :
                </p>
                <input className="block font-medium ml-1 !border-[#D4CDCD] pr-30 pb-2 -mt-0.5 text-xs text-[#D4CDCD]/100 border rounded-lg" />
              </div>
              <div className="flex mb-3">
                <p className="block text-sm font-medium text-[#0C0E5D] mr-3">
                  Client's email :
                </p>
                <input className="block font-medium ml-1 !border-[#D4CDCD] pr-30 pb-2 -mt-0.5 text-xs text-[#D4CDCD]/100 border rounded-lg" />
              </div>
              <div className="flex mb-3">
                <p className="block text-sm font-medium text-[#0C0E5D] mr-3">
                  Client's Phone number :
                </p>
                <input className="block font-medium ml-1 !border-[#D4CDCD] pr-30 pb-2 -mt-0.5 text-xs text-[#D4CDCD]/100 border rounded-lg" />
              </div>
            </div>
            <div className="ml-95 mt-10 mb-5 w-40">
              <button className="bg-[#0C0E5D] text-[#ffffff] px-8 rounded-tl-3xl rounded-br-3xl text-sm font-bold">
                Create Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentTicketModal;