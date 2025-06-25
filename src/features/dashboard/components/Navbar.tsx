import React from "react";
import ThemeToggle from "@/shared/components/ui/ThemeToggle";
import NotificationBell from "@/shared/components/ui/Bell";
import ResetIcon from "@/shared/components/ui/reset";
import ProfileImage from "@/shared/assets/images/profile.png";
import DropdownImage from "@/shared/assets/images/dropdown.png";

interface NavbarProps {
  pageName: string;
}

const Navbar: React.FC<NavbarProps> = ({ pageName }) => {
  return (
    <header className="sticky top-0 z-40 h-20 bg-transparent flex items-end">
      {/* This inner container controls the width and border */}
      <div className="flex items-center justify-between h-[calc(100%-1px)] border-b border-[#D4CDCD] mx-auto w-[calc(100%-3rem)]">
        {/* Left: Page Title */}
        <h1 className="text-xl font-semibold text-[#0C0E5D] capitalize">
          {pageName}
        </h1>

        {/* Right: Icons + Profile */}
        <div className="flex items-center gap-4 text-gray-600">
          {/* Reset */}
          <button
            onClick={() => console.log("Reset clicked")}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#B9B4B4] hover:bg-[#EAF1FF] transition"
          >
            <ResetIcon />
          </button>

          {/* Notification */}
          <button
            onClick={() => console.log("Notifications clicked")}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#B9B4B4] hover:bg-[#EAF1FF] transition"
          >
            <NotificationBell />
          </button>

          {/* Profile + Dropdown */}
          <button className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#B9B4B4] hover:bg-[#EAF1FF] transition">
            <img
              src={ProfileImage}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-700">
              Michael Presley
            </span>
            <img
              src={DropdownImage}
              alt="dropdown"
              className="w-4 h-4 object-contain"
            />
          </button>
          {/* ThemeToggle */}
          <button className="h-12 w-12 flex items-center justify-center rounded-full border border-[#B9B4B4] hover:bg-[#EAF1FF] transition">
            <ThemeToggle />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
