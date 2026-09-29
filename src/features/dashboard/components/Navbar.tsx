import React from "react";
import ThemeToggle from "@/shared/components/ui/ThemeToggle";
import NotificationButton from "@dashboard/components/NotificationButton";
import ResetIcon from "@/shared/components/ui/Reset";
import ProfileButton from "@dashboard/components/ProfileButton";
import Tooltip from "@/shared/components/ui/Tooltip";

interface NavbarProps {
  pageName: string;
}

const Navbar: React.FC<NavbarProps> = ({ pageName }) => {
  return (
    <header className="sticky top-0 z-40 h-[72px] bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border)]">
      <div className="flex items-center justify-between h-full px-6 lg:px-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            iRES platform
          </p>
          <h1 className="text-lg font-semibold text-[var(--heading)] leading-tight">
            {pageName}
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <Tooltip content="Refresh page">
            <button
              type="button"
              className="ui-icon-btn"
              aria-label="Refresh page"
              onClick={() => window.location.reload()}
            >
              <ResetIcon />
            </button>
          </Tooltip>
          <NotificationButton />
          <ProfileButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
