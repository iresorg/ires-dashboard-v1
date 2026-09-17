import React from "react";
import BellIcon from "../../assets/images/bell.png";

interface NotificationBellProps {
  className?: string;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ className }) => {
  return (
    <img
      src={BellIcon}
      alt=""
      className={`w-4 h-4 object-contain ${className ?? ""}`}
    />
  );
};

export default NotificationBell;
