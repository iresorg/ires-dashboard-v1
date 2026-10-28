/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAuthStore } from "../store/authStore";
import PasswordInput from "./PasswordInput";
import { ROUTES } from "@/shared/constants/routes";

interface LoginInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const notice = (location.state as { notice?: string } | null)?.notice;
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>();

  const onSubmit = async (data: LoginInputs) => {
    try {
      await login(data.email, data.password);
      const mustChange = useAuthStore.getState().user?.mustChangePassword;
      navigate(mustChange ? ROUTES.PROFILE : ROUTES.DASHBOARD);
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || "Login failed. Please try again.";
      alert(message);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ires-red)] mb-2">
        Administrator access
      </p>
      <h2 className="text-3xl font-semibold text-[var(--foreground)] mb-2">
        Welcome back
      </h2>
      <p className="text-sm text-[var(--muted)] mb-6">
        Sign in with your iRES credentials to continue.
      </p>
      {notice && (
        <p className="text-sm text-[var(--heading)] rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 mb-4">
          {notice}
        </p>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col"
      >
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-[var(--muted)] mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email", { required: "Email is required" })}
            className="ui-input"
            placeholder="nina.v@example.com"
          />
          {errors.email && (
            <span className="text-xs text-[var(--ires-red)] mt-1 block">
              {errors.email.message}
            </span>
          )}
        </div>

        <PasswordInput
          id="password"
          placeholder="Password"
          error={errors.password?.message}
          register={register("password", {
            required: "Password is required",
          })}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="ui-btn-danger w-full h-11 mt-2"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>

        <p className="text-sm text-center">
          <Link
            to={ROUTES.FORGOT_PASSWORD}
            className="text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            Forgot password?
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
