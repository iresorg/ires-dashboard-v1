import React, { useEffect } from "react";
import CloseIcon from "@/shared/assets/icons/close.svg";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
}) => {
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
      {/* Blur + backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div
        className="absolute top-[70px] bottom-0 left-[65%] z-[60] flex items-start justify-end"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-xl shadow-xl w-[350px]">
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
            <h2 className="w-60 text-md font-semibold">
              You have 4 Notifications
            </h2>

            <div className="flex flex-row items-center space-x-1">
              <div className="w-full px-3 py-2 bg-gray-300 text-gray-900 rounded-lg">
                New ticket assigned to you.
              </div>
            </div>

            <div className="flex flex-row items-center space-x-1">
              <div className="w-full px-3 py-2 bg-gray-300 text-gray-900 rounded-lg">
                Password reset successful.
              </div>
            </div>

            <div className="flex flex-row items-center space-x-1">
              <div className="w-full px-3 py-2 bg-gray-300 text-gray-900 rounded-lg">
                New responder added.
              </div>
            </div>

            <div className="flex flex-row items-center justify-start space-x-1">
              <div className="w-full px-3 py-2 bg-gray-300 text-gray-900 rounded-lg">
                New agent added.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDrawer;
