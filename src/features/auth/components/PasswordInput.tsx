import React, { useState } from "react";
import EyeIcon from "../../../shared/assets/icons/Eye.svg";

interface PasswordInputProps {
  id: string;
  placeholder?: string;
  error?: string;
  register: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    name: string;
    ref: (instance: HTMLInputElement | null) => void;
  };
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  placeholder,
  error,
  register,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-64">
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        {...register}
        className="block w-full rounded-md px-3 py-4 pr-10 bg-[var(--input-bg-light)] dark:bg-customPink placeholder-gray-400 text-[var(--ires-black)] dark:text-[var(--ires-white)] focus:outline-none focus:ring-2 focus:ring-[var(--ires-red)] focus:border-[var(--ires-red)]"
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute inset-y-0 right-3 flex items-center justify-center w-8 h-full"
        tabIndex={-1}
      >
        <div className="relative w-5 h-5">
          <img
            src={EyeIcon}
            alt={showPassword ? "Hide password" : "Show password"}
            className="w-full h-full"
          />
          {showPassword && (
            <span className="absolute top-1/2 left-1/2 w-[110%] h-[2px] bg-black dark:bg-white transform -translate-x-1/2 -translate-y-1/2 rotate-45 pointer-events-none" />
          )}
        </div>
      </button>
      {error && (
        <span className="text-xs text-red-600 mt-1 block">{error}</span>
      )}
    </div>
  );
};

export default PasswordInput;
