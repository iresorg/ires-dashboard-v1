import React, { useState } from "react";
import Tooltip from "@/shared/components/ui/Tooltip";
import { useToast } from "@/shared/components/ui/useToast";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getAuthErrorMessage } from "@/features/auth/services/authService";
import { resetUserPassword } from "@/features/users/services/userService";
import { canResetStaffPassword } from "@/shared/types/roles";

interface ResetStaffPasswordButtonProps {
  userId: string;
  userName: string;
  targetRole?: string;
}

const KeyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="8" cy="14" r="4.25" stroke="currentColor" strokeWidth="1.75" />
    <path
      d="M11.2 11.8 20 3m0 0h-3.2M20 3v3.2"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ResetStaffPasswordButton: React.FC<ResetStaffPasswordButtonProps> = ({
  userId,
  userName,
  targetRole,
}) => {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const allowed =
    Boolean(user) &&
    user?.id !== userId &&
    canResetStaffPassword(user?.role, targetRole);

  if (!allowed) return null;

  const handleConfirm = async () => {
    setIsSending(true);
    try {
      const message = await resetUserPassword(userId);
      showSuccess(message);
      setIsOpen(false);
    } catch (error) {
      showError(getAuthErrorMessage(error, "Could not send the new password email."));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Tooltip content="Reset password" side="top">
        <button
          type="button"
          className="ui-icon-btn !w-8 !h-8"
          aria-label={`Reset password for ${userName}`}
          onClick={() => setIsOpen(true)}
        >
          <KeyIcon />
        </button>
      </Tooltip>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-password-title"
        >
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={isSending ? undefined : () => setIsOpen(false)}
          />
          <div
            className="relative z-10 ui-card text-[var(--foreground)] px-6 py-8 w-full max-w-md"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 id="reset-password-title" className="text-lg font-semibold text-[var(--heading)] text-center">
              Send {userName} a new password?
            </h3>
            <p className="text-sm text-[var(--muted)] text-center mt-2">
              The new password goes to their email. They must change it on the next sign-in, and any session they already have will end.
            </p>
            <div className="flex justify-center gap-3 mt-6">
              <button
                type="button"
                className="ui-btn-primary disabled:opacity-50"
                onClick={handleConfirm}
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Send password"}
              </button>
              <button
                type="button"
                className="ui-action-btn h-10 px-4 disabled:opacity-50"
                onClick={() => setIsOpen(false)}
                disabled={isSending}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetStaffPasswordButton;
