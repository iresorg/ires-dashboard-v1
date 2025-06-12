import React from "react";
import { useNavigate } from "react-router-dom";

const LOGIN_TYPES = [
  { label: "Admin", value: "admin" },
  { label: "Agent", value: "agent" },
  { label: "Responder", value: "responder" },
];

const TabLogin = () => {
  const navigate = useNavigate();

  const handleLoginTypeClick = (type: string) => {
    navigate(`/login/${type}`);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-center">Select Login Type</h2>
      <div className="flex mb-8">
        {LOGIN_TYPES.map((type) => (
          <button
            key={type.value}
            className="flex-1 px-4 py-2 mx-1 rounded-full font-semibold transition-colors duration-200 text-sm focus:outline-none bg-gray-100 dark:bg-[var(--ires-black)] text-gray-700 dark:text-gray-200 hover:bg-[var(--ires-red)] hover:text-white"
            onClick={() => handleLoginTypeClick(type.value)}
            type="button"
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabLogin;
