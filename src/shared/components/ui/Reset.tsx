import React from "react";
import ResetImg from "@/shared/assets/images/reset.png"; 

interface ResetIconProps {
  onClick?: () => void;
  className?: string;
}

const ResetIcon: React.FC<ResetIconProps> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`w-6 h-6 hover:scale-110 transition-transform ${className}`}
    >
      <img
        src={ResetImg}
        alt="Reset"
        className="w-full h-full object-contain"
      />
    </button>
  );
};

export default ResetIcon;
