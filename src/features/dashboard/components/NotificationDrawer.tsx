import React from "react";
import CloseIcon from "@/shared/assets/icons/close.svg";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

 return (
    <div className="absolute top-70 bottom-0 -left-35 -right-15 z-[60] flex items-center justify-center inset-0">
      <div className="max-w-xl bg-white rounded-xl">
        {/* Header */}
        <div className="w-full flex justify-between items-center py-2 border-b-4 border-[#B27373] mb-6">
          <h2 className="bg-[#12096f] text-white px-5 py-1 rounded-xl ml-3">
            Notifications
          </h2>
          <button onClick={onClose}>
            <img
              src={CloseIcon}
              alt="close"
              className="w-4 h-4 object-contain mr-3"
            />
          </button>
        </div>
        {/* Content */}
        <div className="space-y-3 w-auto mx-5 border border-gray-100 px-5 py-8 rounded-xl mb-10">
          <h2 className="w-60 text-md font-semibold">You have 4 Notifications</h2>
          {/* First Name */}
          <div className="flex flex-row items-center space-x-1">
            <div className="w-full px-3 py-2 bg-gray-300 text-gray-900 rounded-lg">
              New ticket assigned to you.
            </div>
          </div>
          {/* Last Name */}
          <div className="flex flex-row items-center space-x-1">
            <div className="w-full px-3 py-2 bg-gray-300 text-gray-900 rounded-lg">
              Password reset successful.
            </div>
          </div>
          {/* Email */}
          <div className="flex flex-row items-center space-x-1">
            <div className="w-full px-3 py-2 bg-gray-300 text-gray-900 rounded-lg">
              New responder added.
            </div>
          </div>
          {/* Role */}
          <div className="flex flex-row items-center justify-start space-x-1">
            <div className="w-full px-3 py-2 bg-gray-300 text-gray-900 rounded-lg">
              New agent added.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDrawer;
