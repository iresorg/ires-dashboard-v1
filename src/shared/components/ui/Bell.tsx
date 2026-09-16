import React from "react";
import BellIcon from "../../assets/images/bell.png"; 

interface NotificationBellProps {
  onClick?: () => void;
  className?: string;
}

const NotificationBell: React.FC<NotificationBellProps> = ({
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-6 h-6 hover:scale-110 transition-transform ${className}`}
    >
      <img
        src={BellIcon}
        alt="Notifications"
        className="w-full h-full object-contain"
      />
    </button>
  );
};

export default NotificationBell;
