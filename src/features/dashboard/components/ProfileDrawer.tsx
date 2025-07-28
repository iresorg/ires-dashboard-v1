import CloseIcon from "@/shared/assets/icons/close.svg";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-sm font-semibold text-gray-800">Profile</h2>
        <button onClick={onClose}>
          <img src={CloseIcon} alt="close" className="w-4 h-4 object-contain" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 text-sm text-gray-700 space-y-3">
        <p>Welcome, Michael Presley</p>
        <button className="w-full text-left py-2 px-3 rounded bg-[#F3F4F6] hover:bg-[#e5e7eb]">
          View Profile
        </button>
        <button className="w-full text-left py-2 px-3 rounded bg-[#F3F4F6] hover:bg-[#e5e7eb]">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDrawer;
