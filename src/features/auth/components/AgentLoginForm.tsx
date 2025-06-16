import React from "react";
import { useForm } from "react-hook-form";
import PasswordInput from "./PasswordInput"; // Adjust the path if needed

interface AgentLoginInputs {
  agentId: string;
  token: string;
}

const AgentLoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AgentLoginInputs>();

  const onSubmit = async (data: AgentLoginInputs) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-64">
        <h2 className="text-xl font-bold mb-6 text-iresNavyBlue dark:text-iresWhite">
          AGENT LOGIN
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col"
        >
          <div>
            <input
              id="agentId"
              type="text"
              {...register("agentId", { required: "Agent ID is required" })}
              className="block w-full rounded-md px-3 py-4 bg-[var(--input-bg-light)] dark:bg-customPink placeholder-gray-500 text-[var(--foreground-main)] dark:text-[var(--ires-white)] focus:outline-none focus:ring-2 focus:ring-[var(--ires-red)] focus:border-[var(--ires-red)]"
              placeholder="Agent ID"
            />
            {errors.agentId && (
              <span className="text-xs text-red-600 mt-1 block">
                {errors.agentId.message}
              </span>
            )}
          </div>

          {/* Token field with show/hide password */}
          <PasswordInput
            id="token"
            placeholder="Token"
            error={errors.token?.message}
            register={register("token", {
              required: "Token is required",
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
            <a href="#" className="text-gray-300 hover:underline">
              Forgot password?
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AgentLoginForm;
