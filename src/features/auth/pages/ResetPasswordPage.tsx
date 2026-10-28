import React, { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ThemeProvider } from "@shared/ThemeContext";
import AuthSplitLayout from "../components/AuthSplitLayout";
import PasswordInput from "../components/PasswordInput";
import { getAuthErrorMessage, resetPassword } from "../services/authService";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "@/shared/constants/routes";

interface ResetInputs {
  newPassword: string;
  confirmPassword: string;
}

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearSession } = useAuth();
  const [error, setError] = useState("");

  const email = useMemo(
    () => (searchParams.get("email") || "").trim().toLowerCase(),
    [searchParams]
  );
  const token = useMemo(() => (searchParams.get("token") || "").trim(), [searchParams]);
  const linkReady = Boolean(email && token);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetInputs>();

  const onSubmit = async (data: ResetInputs) => {
    if (!linkReady) return;
    setError("");
    try {
      const message = await resetPassword({
        email,
        token,
        newPassword: data.newPassword,
      });
      clearSession();
      navigate(ROUTES.LOGIN, { replace: true, state: { notice: message } });
    } catch (err) {
      setError(getAuthErrorMessage(err, "Could not reset the password. Try again."));
    }
  };

  return (
    <ThemeProvider>
      <AuthSplitLayout>
        <div className="w-full max-w-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ires-red)] mb-2">
            Administrator access
          </p>
          <h2 className="text-3xl font-semibold text-[var(--foreground)] mb-2">
            Choose a new password
          </h2>
          <p className="text-sm text-[var(--muted)] mb-6">
            {linkReady
              ? `This reset is for ${email}. Use at least 8 characters.`
              : "This reset link is missing an email or token. Request a new one."}
          </p>

          {linkReady ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
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
              {error && <p className="text-sm text-[var(--ires-red)]">{error}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="ui-btn-danger w-full h-11 mt-2"
              >
                {isSubmitting ? "Saving..." : "Update password"}
              </button>
            </form>
          ) : (
            <p className="text-sm text-[var(--ires-red)]">
              Open the reset link from your email, or request a new one.
            </p>
          )}

          <p className="text-sm text-center mt-6 space-x-3">
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className="text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Request a new link
            </Link>
            <Link to={ROUTES.LOGIN} className="text-[var(--muted)] hover:text-[var(--foreground)]">
              Sign in
            </Link>
          </p>
        </div>
      </AuthSplitLayout>
    </ThemeProvider>
  );
};

export default ResetPasswordPage;
