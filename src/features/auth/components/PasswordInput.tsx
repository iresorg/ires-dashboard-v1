import React, { useState } from "react";
import Tooltip from "@/shared/components/ui/Tooltip";

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

const EyeIconSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden
  >
    <path
      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="12"
      r="3"
      stroke="currentColor"
      strokeWidth="1.75"
    />
  </svg>
);

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  placeholder,
  error,
  register,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <label htmlFor={id} className="block text-xs font-medium text-[var(--muted)] mb-1.5">
        Password
      </label>
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        {...register}
        className="ui-input pr-10 remove-eye"
      />

      <Tooltip
        content={showPassword ? "Hide password" : "Show password"}
        side="left"
        className="absolute right-2 top-[1.85rem] h-10 w-8"
      >
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="flex h-10 w-8 items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)]"
          tabIndex={-1}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <span className="relative inline-flex h-5 w-5">
            <EyeIconSvg className="h-5 w-5" />
            {showPassword && (
              <span className="pointer-events-none absolute left-1/2 top-1/2 h-[2px] w-[110%] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[var(--muted)]" />
            )}
          </span>
        </button>
      </Tooltip>
      {error && (
        <span className="text-xs text-red-600 mt-1 block">{error}</span>
      )}
    </div>
  );
};

export default PasswordInput;
