import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getUserInitials, getUserInitialsColor } from "@/shared/utils/userUtils";
import Tooltip from "@/shared/components/ui/Tooltip";
import { ROUTES } from "@/shared/constants/routes";

const ProfileButton = () => {
  const location = useLocation();
  const { profile } = useAuth();
  const isActive = location.pathname === ROUTES.PROFILE;

  const displayName = profile
    ? `${profile.firstName} ${profile.lastName}`
    : "Profile";

  const userInitials = getUserInitials(profile?.firstName, profile?.lastName);
  const initialsColor = getUserInitialsColor(profile?.firstName, profile?.lastName);

  return (
    <Tooltip content="Profile and password">
      <Link
        to={ROUTES.PROFILE}
        aria-label="Profile and password"
        aria-current={isActive ? "page" : undefined}
        className={`flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-lg border transition-colors ${
          isActive
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
        <span className="text-sm font-medium text-[var(--heading)] hidden sm:inline">
          {displayName}
        </span>
      </Link>
    </Tooltip>
  );
};

export default ProfileButton;
