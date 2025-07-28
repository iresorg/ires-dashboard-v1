import React from "react";
import ThemeToggle from "@/shared/components/ui/ThemeToggle";
import NotificationBell from "@/shared/components/ui/Bell";
import ResetIcon from "@/shared/components/ui/Reset";
import ProfileButton from "@dashboard/components/ProfileButton";

interface NavbarProps {
  pageName: string;
}

const Navbar: React.FC<NavbarProps> = ({ pageName }) => {
  return (
    <header className="sticky top-0 z-40 h-20">
      <div className="relative flex items-center justify-between h-full px-6">
        {/* Left: Page Title */}
        <h1 className="text-xl font-semibold text-[#0C0E5D] capitalize">
          {pageName}
        </h1>

        {/* Right: Icons + Profile */}
        <div className="flex items-center gap-4 text-gray-600">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-[#B9B4B4] hover:bg-[#EAF1FF] transition">
            <ResetIcon />
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-[#B9B4B4] hover:bg-[#EAF1FF] transition">
            <NotificationBell />
          </div>

          {/* Profile Button*/}
          <ProfileButton />

          <div className="h-12 w-12 flex items-center justify-center rounded-full border border-[#B9B4B4] hover:bg-[#EAF1FF] transition">
            <ThemeToggle />
          </div>
        </div>

        {/* Bottom Border Line */}
        <div className="absolute bottom-0 left-6 h-[1px] w-[calc(100%-120px)] bg-[#D4CDCD]" />
      </div>
    </header>
  );
};

export default Navbar;
