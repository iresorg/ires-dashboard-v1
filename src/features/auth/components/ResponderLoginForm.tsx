import React from "react";
import { useForm } from "react-hook-form";

interface ResponderLoginInputs {
    responderId: string;
    token: string;
}

const ResponderLoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResponderLoginInputs>();

    const onSubmit = async (data: ResponderLoginInputs) => {
        // TODO: Call responder login API
        alert(JSON.stringify(data));
    };

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col items-center"
      >
        <div>
          <label
            htmlFor="responderId"
            className="block text-sm font-medium text-[var(--foreground-main)] dark:text-[var(--ires-white)] mb-1"
          ></label>
          <input
            id="responderId"
            type="text"
            {...register("responderId", {
              required: "Responder ID is required",
            })}
            className="block w-64 rounded-md px-3 py-4 bg-[var(--input-bg-light)] dark:bg-customPink placeholder-gray-500 text-[var(--foreground-main)] dark:text-[var(--ires-white)] focus:outline-none focus:ring-2 focus:ring-[var(--ires-red)] focus:border-[var(--ires-red)]"
            placeholder="Responder ID"
          />
          {errors.responderId && (
            <span className="text-xs text-red-600 mt-1 block">
              {errors.responderId.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="token"
            className="block text-sm font-medium text-[var(--foreground-main)] dark:text-[var(--ires-white)] mb-1"
          ></label>
          <input
            id="token"
            type="password"
            {...register("token", { required: "Token is required" })}
            className="block w-64 rounded-md px-3 py-4 bg-[var(--input-bg-light)] dark:bg-customPink placeholder-gray-500 text-[var(--foreground-main)] dark:text-[var(--ires-white)] focus:outline-none focus:ring-2 focus:ring-[var(--ires-red)] focus:border-[var(--ires-red)]"
            placeholder="Token"
          />
          {errors.token && (
            <span className="text-xs text-red-600 mt-1 block">
              {errors.token.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-64 py-4 bg-[var(--ires-red)] text-white font-semibold text-base mt-2 hover:bg-red-700 transition-colors duration-200 rounded-tr-2xl rounded-bl-2xl"
        >
          {isSubmitting ? "Signing in..." : "LOGIN"}
        </button>
        <p className="text-sm text-center">
          <a href="#" className="text-gray-300 hover:underline">
            Forgot password?
          </a>
        </p>
      </form>
    );
};

export default ResponderLoginForm; 