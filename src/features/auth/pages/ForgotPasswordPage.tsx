import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@shared/ThemeContext";
import AuthSplitLayout from "../components/AuthSplitLayout";
import { forgotPassword, getAuthErrorMessage } from "../services/authService";
import { getStaffEmailError, toLowerEmail } from "@/shared/utils/email";
import { ROUTES } from "@/shared/constants/routes";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const emailError = getStaffEmailError(email);
    if (emailError) {
      setError(emailError);
      setSuccess("");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");
    try {
      const message = await forgotPassword(email.trim().toLowerCase());
      setSuccess(message);
    } catch (err) {
      setError(
        getAuthErrorMessage(err, "Could not send a reset link. Try again.")
      );
    } finally {
      setIsSubmitting(false);
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
            Reset your password
          </h2>
          <p className="text-sm text-[var(--muted)] mb-6">
            Enter the email on your staff account. If it is active, we will send a reset link that lasts 1 hour.
          </p>

          {success ? (
            <div className="space-y-4">
              <p className="text-sm text-[var(--heading)] rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
                {success}
              </p>
              <button
                type="button"
                className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                onClick={() => setSuccess("")}
              >
                Send another link
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-[var(--muted)] mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  value={email}
                  onChange={(event) => {
                    setEmail(toLowerEmail(event.target.value));
                    setError("");
                  }}
                  className="ui-input"
                  placeholder="nina.v@example.com"
                />
              </div>
              {error && (
                <p className="text-sm text-[var(--ires-red)]">{error}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="ui-btn-danger w-full h-11 mt-2"
              >
                {isSubmitting ? "Sending..." : "Send reset link"}
              </button>
            </form>
          )}

          <p className="text-sm text-center mt-6">
            <Link to={ROUTES.LOGIN} className="text-[var(--muted)] hover:text-[var(--foreground)]">
              Back to sign in
            </Link>
          </p>
        </div>
      </AuthSplitLayout>
    </ThemeProvider>
  );
};

export default ForgotPasswordPage;
