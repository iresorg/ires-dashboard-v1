import { useState, useRef } from "react";
import NotificationBell from "@/shared/components/ui/Bell";
import NotificationDrawer from "./NotificationDrawer";

const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const closeDrawer = () => setIsOpen(false);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={toggleDrawer}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-[#B9B4B4] hover:bg-[#EAF1FF] transition"
      >
        <NotificationBell />
      </button>

      {isOpen && <NotificationDrawer isOpen={isOpen} onClose={closeDrawer} />}
    </div>
  );
};

export default NotificationButton;
