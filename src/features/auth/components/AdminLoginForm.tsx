import React from "react";
import { useForm } from "react-hook-form";

interface AdminLoginInputs {
    email: string;
    password: string;
}

const AdminLoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AdminLoginInputs>();

    const onSubmit = async (data: AdminLoginInputs) => {
        // TODO: Call admin login API
        alert(JSON.stringify(data));
    };

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col items-center"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[var(--foreground-main)] dark:text-[var(--ires-white)] mb-1"
          ></label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email", { required: "Email is required" })}
            className="block w-64 rounded-md px-3 py-4 bg-[var(--input-bg-light)] dark:bg-[var(--input-bg-dark)] border border-gray-300 dark:border-[var(--ires-black)] placeholder-gray-300 text-[var(--foreground-main)] dark:text-[var(--ires-white)] focus:outline-none focus:ring-2 focus:ring-[var(--ires-red)] focus:border-[var(--ires-red)]"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-xs text-red-600 mt-1 block">
              {errors.email.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[var(--foreground-main)] dark:text-[var(--ires-white)] mb-1"
          ></label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password", { required: "Password is required" })}
            className="block w-64 rounded-md px-3 py-4 bg-[var(--input-bg-light)] dark:bg-[var(--input-bg-dark)] border border-gray-300 dark:border-[var(--ires-black)] placeholder-gray-300 text-[var(--foreground-main)] dark:text-[var(--ires-white)] focus:outline-none focus:ring-2 focus:ring-[var(--ires-red)] focus:border-[var(--ires-red)]"
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-xs text-red-600 mt-1 block">
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-64 py-4  bg-[var(--ires-red)] text-white dark:text-white font-semibold text-base mt-2 hover:bg-red-700 transition-colors duration-200 rounded-tr-2xl rounded-bl-2xl
"
        >
          {isSubmitting ? "Signing in..." : "LOGIN"}
        </button>
        <p className="text-sm text-center">
          <a
            href="#"
            className="text-gray-300 hover:underline"
          >
            Forgot password?
          </a>
        </p>
      </form>
    );
};

export default AdminLoginForm; 