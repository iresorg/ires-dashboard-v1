import React, { useEffect } from "react";
import CloseIcon from "@/shared/assets/icons/close.svg";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getUserInitials, getUserInitialsColor } from "@/shared/utils/userUtils";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ isOpen, onClose }) => {
  const { profile, logout } = useAuth();

  const userInitials = getUserInitials(profile?.firstName, profile?.lastName);
  const initialsColor = getUserInitialsColor(profile?.firstName, profile?.lastName);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-[var(--ires-dark-blue)]/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        className="absolute top-[80px] right-6 z-[60]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ui-card w-[360px] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] bg-[var(--ires-navy-blue)]">
            <h2 className="text-sm font-semibold text-white">Profile</h2>
            <button onClick={onClose} className="text-white/80 hover:text-white">
              <img src={CloseIcon} alt="close" className="w-3.5 h-3.5 invert" />
            </button>
          </div>

          <div className="flex flex-col items-center pt-6 pb-4">
            {profile?.avatar ? (
              <img
                src={typeof profile.avatar === "string" ? profile.avatar : profile.avatar?.url}
                alt="User"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className={`w-16 h-16 rounded-full ${initialsColor} flex items-center justify-center text-white font-bold text-xl`}>
                {userInitials}
              </div>
            )}
            <p className="mt-3 text-sm font-semibold text-[var(--ires-navy-blue)]">
              {profile ? `${profile.firstName} ${profile.lastName}` : "Loading..."}
            </p>
            <p className="text-xs text-[var(--muted)]">{profile?.role}</p>
          </div>

          <div className="px-5 pb-5 space-y-3">
            {[
              ["First name", profile?.firstName],
              ["Last name", profile?.lastName],
              ["Email", profile?.email],
              ["Role", profile?.role],
            ].map(([label, value]) => (
              <div key={String(label)}>
                <label className="block text-[11px] uppercase tracking-wide text-[var(--muted)] mb-1">
                  {label}
                </label>
                <input
                  type="text"
                  value={value || "Loading..."}
                  className="ui-input"
                  readOnly
                />
              </div>
            ))}

            <button
              onClick={handleLogout}
              className="ui-btn-danger w-full mt-2"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDrawer;
