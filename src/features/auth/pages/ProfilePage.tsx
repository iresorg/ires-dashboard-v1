import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import PasswordInput from "@/features/auth/components/PasswordInput";
import { changePassword } from "@/features/auth/services/authService";
import { getRoleDisplayName, type Role } from "@/shared/types/roles";
import { getUserInitials, getUserInitialsColor } from "@/shared/utils/userUtils";
import { useToast } from "@/shared/components/ui/useToast";
import { ROUTES } from "@/shared/constants/routes";

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, clearPasswordChange, logout } = useAuth();
  const { showSuccess, showError } = useToast();
  const mustChange = Boolean(user?.mustChangePassword || profile?.mustChangePassword);

  const display = profile ?? user;
  const firstName = display?.firstName ?? "";
  const lastName = display?.lastName ?? "";
  const avatar =
    profile?.avatar && typeof profile.avatar !== "string"
      ? profile.avatar.url
      : typeof profile?.avatar === "string"
        ? profile.avatar
        : user?.avatar;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordForm>();

  const onSubmit = async (data: PasswordForm) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      clearPasswordChange();
      reset();
      showSuccess("Password updated");
      if (mustChange) navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Could not update password.";
      showError(message);
    }
  };

  const roleLabel = display?.role
    ? getRoleDisplayName(display.role as Role)
    : "—";

  return (
    <div className="w-full max-w-3xl flex flex-col gap-5">
      {mustChange && (
        <div className="ui-card px-5 py-4 border-[color-mix(in_srgb,var(--ires-red)_35%,var(--border))]">
          <p className="text-sm font-semibold text-[var(--heading)]">
            Set a new password to continue
          </p>
          <p className="text-sm text-[var(--muted)] mt-1">
            This is your first sign-in. Replace the temporary password before using the dashboard.
          </p>
        </div>
      )}

      <section className="ui-card p-6 flex flex-col sm:flex-row gap-5 items-start">
        {avatar ? (
          <img
            src={avatar}
            alt=""
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div
            className={`h-16 w-16 rounded-full ${getUserInitialsColor(firstName, lastName)} flex items-center justify-center text-white font-semibold`}
          >
            {getUserInitials(firstName, lastName)}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 w-full">
          {[
            ["Name", `${firstName} ${lastName}`.trim() || "—"],
            ["Email", display?.email || "—"],
            ["Role", roleLabel],
            ["Status", display?.status || "—"],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-[11px] uppercase tracking-wide text-[var(--muted)]">
                {label}
              </p>
              <p className="text-sm font-medium text-[var(--heading)] mt-1 break-all">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="ui-card p-6">
        <h2 className="text-lg font-semibold text-[var(--heading)]">
          Update password
        </h2>
        <p className="text-sm text-[var(--muted)] mt-1 mb-5">
          Use this anytime. Enter your current password, then choose a new one.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
          <PasswordInput
            id="currentPassword"
            label="Current password"
            placeholder="Current password"
            error={errors.currentPassword?.message}
            register={register("currentPassword", {
              required: "Current password is required",
            })}
          />
          <PasswordInput
            id="newPassword"
            label="New password"
            placeholder="New password"
            error={errors.newPassword?.message}
            register={register("newPassword", {
              required: "New password is required",
              minLength: { value: 8, message: "Use at least 8 characters" },
            })}
          />
          <PasswordInput
            id="confirmPassword"
            label="Confirm new password"
            placeholder="Confirm new password"
            error={errors.confirmPassword?.message}
            register={register("confirmPassword", {
              required: "Confirm your new password",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
          />
          <button type="submit" className="ui-btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Update password"}
          </button>
        </form>
      </section>

      <button type="button" className="ui-btn-danger w-fit" onClick={logout}>
        Log out
      </button>
    </div>
  );
};

export default ProfilePage;
