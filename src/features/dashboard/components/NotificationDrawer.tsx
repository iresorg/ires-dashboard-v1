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
    <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-50">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-sm font-semibold text-gray-800">Notifications</h2>
        <button onClick={onClose}>
          <img src={CloseIcon} alt="close" className="w-4 h-4 object-contain" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 text-sm text-gray-700 space-y-3">
        <p>You have 3 new notifications</p>
        <div className="space-y-2">
          <div className="bg-[#F3F4F6] p-2 rounded hover:bg-[#e5e7eb]">
            New ticket assigned to you.
          </div>
          <div className="bg-[#F3F4F6] p-2 rounded hover:bg-[#e5e7eb]">
            Password reset successful.
          </div>
          <div className="bg-[#F3F4F6] p-2 rounded hover:bg-[#e5e7eb]">
            New responder added.
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDrawer;
