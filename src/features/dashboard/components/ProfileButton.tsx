import { useState, useRef } from "react";
import ProfileDrawer from "./ProfileDrawer";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getUserInitials, getUserInitialsColor } from "@/shared/utils/userUtils";

const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const { profile } = useAuth();

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const closeDrawer = () => setIsOpen(false);

  const displayName = profile 
    ? `${profile.firstName} ${profile.lastName}`
    : "Loading...";

  const userInitials = getUserInitials(profile?.firstName, profile?.lastName);
  const initialsColor = getUserInitialsColor(profile?.firstName, profile?.lastName);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={toggleDrawer}
        className="flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--cool-blue-tint)] transition-colors"
      >
        {profile?.avatar ? (
          <img
            src={typeof profile.avatar === 'string' ? profile.avatar : profile.avatar?.url}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className={`w-8 h-8 rounded-full ${initialsColor} flex items-center justify-center text-white font-semibold text-xs`}>
            {userInitials}
          </div>
        )}
        <span className="text-sm font-medium text-[var(--ires-navy-blue)] hidden sm:inline">
          {displayName}
        </span>
      </button>

      {isOpen && <ProfileDrawer isOpen={isOpen} onClose={closeDrawer} />}
    </div>
  );
};

export default ProfileButton;
