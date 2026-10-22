import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getUserInitials, getUserInitialsColor } from "@/shared/utils/userUtils";
import Tooltip from "@/shared/components/ui/Tooltip";
import { ROUTES } from "@/shared/constants/routes";

const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ top: 80, right: 24 });
  const location = useLocation();
  const { profile, logout } = useAuth();

  const displayName = profile
    ? `${profile.firstName} ${profile.lastName}`
    : "Profile";

  const userInitials = getUserInitials(profile?.firstName, profile?.lastName);
  const initialsColor = getUserInitialsColor(profile?.firstName, profile?.lastName);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen || !buttonRef.current) return;

    const updatePosition = () => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      setCoords({
        top: rect.bottom + 8,
        right: Math.max(16, window.innerWidth - rect.right),
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    closeMenu();
    logout();
  };

  return (
    <>
      <Tooltip content="Account menu">
        <button
          ref={buttonRef}
          type="button"
          aria-label="Account menu"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          onClick={() => setIsOpen((open) => !open)}
          className={`flex items-center gap-2.5 pl-1.5 pr-2.5 py-1 rounded-lg border transition-colors ${
            isOpen
              ? "border-[var(--ires-navy-blue)] bg-[var(--cool-blue-tint)]"
              : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--cool-blue-tint)]"
          }`}
        >
          {profile?.avatar ? (
            <img
              src={typeof profile.avatar === "string" ? profile.avatar : profile.avatar?.url}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div
              className={`w-8 h-8 rounded-full ${initialsColor} flex items-center justify-center text-white font-semibold text-xs`}
            >
              {userInitials || "P"}
            </div>
          )}
          <span className="text-sm font-medium text-[var(--heading)] hidden sm:inline max-w-[140px] truncate">
            {displayName}
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[var(--muted)]">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </Tooltip>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[70]" role="presentation">
            <button
              type="button"
              aria-label="Close account menu"
              className="absolute inset-0 cursor-default"
              onClick={closeMenu}
            />
            <div
              role="menu"
              aria-label="Account"
              className="absolute z-[71] w-44 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] py-1 shadow-[var(--shadow-card)]"
              style={{ top: coords.top, right: coords.right }}
            >
              <Link
                role="menuitem"
                to={ROUTES.PROFILE}
                onClick={closeMenu}
                className="block px-3 py-2 text-sm text-[var(--heading)] hover:bg-[var(--cool-blue-tint)]"
              >
                Profile
              </Link>
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="block w-full px-3 py-2 text-left text-sm text-[var(--ires-red)] hover:bg-[var(--cool-blue-tint)]"
              >
                Log out
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default ProfileButton;
