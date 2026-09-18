import React from "react";
import ResetImg from "@/shared/assets/images/reset.png";

interface ResetIconProps {
  className?: string;
}

const ResetIcon: React.FC<ResetIconProps> = ({ className }) => {
  return (
    <img
      src={ResetImg}
      alt=""
      className={`w-5 h-5 object-contain ${className ?? ""}`}
    />
  );
};

export default ResetIcon;
