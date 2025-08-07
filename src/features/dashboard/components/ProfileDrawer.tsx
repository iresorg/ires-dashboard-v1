import React, { useEffect } from "react";
import CloseIcon from "@/shared/assets/icons/close.svg";
import WilliamPic from "@/shared/assets/images/william.png";
import PencilIcon from "@/shared/assets/icons/pencil.svg";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      {/* Blurred Background Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Your original drawer stays exactly the same here */}
      <div
        className="absolute top-[83px] bottom-0 left-[65%] z-[60] flex items-start justify-end"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-xl shadow-xl w-[350px]">
          {/* Header */}
          <div className="w-full flex justify-between items-center py-2 border-b-4 border-[#B27373] mb-6">
            <h2 className="bg-[#12096f] text-white px-12 py-1 rounded-xl ml-3">
              Profile
            </h2>
            <button onClick={onClose}>
              <img
                src={CloseIcon}
                alt="close"
                className="w-4 h-4 object-contain mr-3"
              />
            </button>
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-6 relative">
            <img
              src={WilliamPic}
              alt="User"
              className="w-20 h-20 rounded-full object-contain"
            />
            <div className="absolute bottom-2 right-[135px]">
              <img src={PencilIcon} alt="edit" className="w-4 h-4" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4 w-auto border border-gray-100 px-5 pt-5 pb-12 rounded-xl mb-10 mx-5">
            <div className="flex flex-row items-center space-x-1">
              <label className="w-30 text-left text-md text-[#12096f]">
                First name
              </label>
              <input
                type="text"
                value="Craig"
                className="w-full px-2 py-1 bg-gray-300 text-gray-900 rounded-lg"
                readOnly
              />
            </div>

            <div className="flex flex-row items-center space-x-0">
              <label className="w-30 text-left text-md text-[#12096f]">
                Last name
              </label>
              <input
                type="text"
                value="Davidson"
                className="w-full px-2 py-1 bg-gray-300 text-gray-900 rounded-lg"
                readOnly
              />
            </div>

            <div className="flex flex-row items-center space-x-1">
              <label className="w-30 text-left text-md text-[#12096f]">
                Email
              </label>
              <input
                type="email"
                value="craig.davidson@gmail.com"
                className="w-full px-2 py-1 bg-gray-300 text-gray-900 rounded-lg"
                readOnly
              />
            </div>

            <div className="flex flex-row items-center justify-start space-x-1 border-b pb-2 mb-2">
              <label className="w-30 text-left text-md text-[#12096f]">
                Role
              </label>
              <input
                type="text"
                value="Responder Admin"
                className="w-full px-2 py-1 bg-gray-300 text-gray-900 rounded-lg"
                readOnly
              />
            </div>

            <div className="flex flex-row items-center justify-start space-x-1">
              <label className="w-30 text-left text-md text-[#12096f]">
                Security
              </label>
              <input
                type="text"
                value="Change Password"
                className="w-full mt-1 px-2 py-1 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                readOnly
              />
            </div>

            <button className="bg-[#12096f] text-white px-10 py-1 rounded-tl-[35px] rounded-br-[35px] float-right">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDrawer;
