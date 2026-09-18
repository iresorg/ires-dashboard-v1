import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import NotificationBell from "@/shared/components/ui/Bell";
import NotificationDrawer from "./NotificationDrawer";

const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ top: 80, right: 24 });

  const closeDrawer = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen || !buttonRef.current) return;

    const updatePosition = () => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      setCoords({
        top: rect.bottom + 10,
        right: window.innerWidth - rect.right,
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

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={`ui-icon-btn ${isOpen ? "bg-[var(--cool-blue-tint)]" : ""}`}
        aria-label="Notifications"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <NotificationBell />
      </button>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[70]" role="presentation">
            <div className="absolute inset-0 bg-[var(--ires-dark-blue)]/15" onClick={closeDrawer} />
            <div
              className="absolute z-[71] w-[min(360px,calc(100vw-2rem))]"
              style={{ top: coords.top, right: coords.right }}
            >
              <NotificationDrawer onClose={closeDrawer} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default NotificationButton;
