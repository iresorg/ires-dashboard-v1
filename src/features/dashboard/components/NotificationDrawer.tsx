import React, { useEffect } from "react";
import CloseIcon from "@/shared/assets/icons/close.svg";

interface NotificationDrawerProps {
  onClose: () => void;
}

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ onClose }) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="ui-card overflow-hidden" role="dialog" aria-modal="true" aria-label="Notifications">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)] bg-[var(--ires-navy-blue)]">
        <h2 className="text-sm font-semibold text-white">Notifications</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-white/80 hover:text-white"
          aria-label="Close notifications"
        >
          <img src={CloseIcon} alt="" className="w-3.5 h-3.5 invert" />
        </button>
      </div>

      <div className="px-5 py-10 min-h-[200px] flex flex-col items-center justify-center text-center">
        <div className="h-10 w-10 rounded-full bg-[var(--cool-blue-tint)] mb-3" />
        <p className="text-sm font-semibold text-[var(--ires-navy-blue)]">
          No notifications yet
        </p>
        <p className="text-xs text-[var(--muted)] mt-1">
          New alerts will appear here.
        </p>
      </div>
    </div>
  );
};

export default NotificationDrawer;
