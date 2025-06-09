import React from "react";
import { useForm } from "react-hook-form";

interface AgentLoginInputs {
    agentId: string;
    token: string;
}

const AgentLoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AgentLoginInputs>();

    const onSubmit = async (data: AgentLoginInputs) => {
        // TODO: Call agent login API
        alert(JSON.stringify(data));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label htmlFor="agentId" className="block text-sm font-medium text-[var(--foreground-main)] dark:text-[var(--ires-white)] mb-1">Agent ID</label>
                <input
                    id="agentId"
                    type="text"
                    {...register("agentId", { required: "Agent ID is required" })}
                    className="block w-full rounded-md px-3 py-2 bg-[var(--input-bg-light)] dark:bg-[var(--input-bg-dark)] border border-gray-300 dark:border-[var(--ires-black)] placeholder-gray-500 text-[var(--foreground-main)] dark:text-[var(--ires-white)] focus:outline-none focus:ring-2 focus:ring-[var(--ires-red)] focus:border-[var(--ires-red)]"
                    placeholder="Agent ID"
                />
                {errors.agentId && <span className="text-xs text-red-600 mt-1 block">{errors.agentId.message}</span>}
            </div>
            <div>
                <label htmlFor="token" className="block text-sm font-medium text-[var(--foreground-main)] dark:text-[var(--ires-white)] mb-1">Token</label>
                <input
                    id="token"
                    type="password"
                    {...register("token", { required: "Token is required" })}
                    className="block w-full rounded-md px-3 py-2 bg-[var(--input-bg-light)] dark:bg-[var(--input-bg-dark)] border border-gray-300 dark:border-[var(--ires-black)] placeholder-gray-500 text-[var(--foreground-main)] dark:text-[var(--ires-white)] focus:outline-none focus:ring-2 focus:ring-[var(--ires-red)] focus:border-[var(--ires-red)]"
                    placeholder="Token"
                />
                {errors.token && <span className="text-xs text-red-600 mt-1 block">{errors.token.message}</span>}
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 rounded-md bg-[var(--ires-red)] text-white font-semibold text-base mt-2 hover:bg-red-700 transition-colors duration-200"
            >
                {isSubmitting ? "Signing in..." : "Login"}
            </button>
        </form>
    );
};

export default AgentLoginForm; 