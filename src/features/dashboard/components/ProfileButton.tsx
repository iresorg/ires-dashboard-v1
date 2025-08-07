import { useState, useRef } from "react";
import ProfileImage from "@/shared/assets/images/profile.png";
import ProfileDrawer from "./ProfileDrawer";
import { useAuth } from "@/features/auth/hooks/useAuth";

const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const { profile } = useAuth();

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const closeDrawer = () => setIsOpen(false);

  const displayName = profile 
    ? `${profile.firstName} ${profile.lastName}`
    : "Loading...";

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={toggleDrawer}
        className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#B9B4B4] hover:bg-[#EAF1FF] transition"
      >
        <img
          src={ProfileImage}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-sm font-medium text-gray-700">
          {displayName}
        </span>
      </button>

      {isOpen && <ProfileDrawer isOpen={isOpen} onClose={closeDrawer} />}
    </div>
  );
};

export default ProfileButton;
