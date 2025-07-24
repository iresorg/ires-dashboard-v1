/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PasswordInput from "./PasswordInput";

interface LoginInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>();

  const onSubmit = async (data: LoginInputs) => {
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || "Login failed. Please try again.";
      alert(message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-64">
        <h2 className="text-2xl font-bold text-iresNavyBlue dark:text-iresWhite mb-4">
          WELCOME TO iRES
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          Please enter your credentials to continue.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col"
        >
          <div>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email", { required: "Email is required" })}
              className="block w-full rounded-md px-3 py-4 bg-[var(--input-bg-light)] dark:bg-customPink placeholder-gray-400 dark:text-[var(--ires-white)] focus:outline-none focus:ring-2 focus:ring-[var(--ires-red)] focus:border-[var(--ires-red)]"
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-xs text-red-600 mt-1 block">
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
            className="w-full py-4 bg-[var(--ires-red)] text-white font-semibold text-base mt-2 hover:bg-red-700 transition-colors duration-200 rounded-tr-2xl rounded-bl-2xl"
          >
            {isSubmitting ? "Signing in..." : "LOGIN"}
          </button>

          <p className="text-sm text-center">
            <a href="#" className="text-gray-400 hover:underline">
              Forgot password?
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
