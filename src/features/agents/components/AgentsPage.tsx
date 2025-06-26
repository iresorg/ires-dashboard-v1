import React from 'react';
import AddIcon from "@/shared/assets/icons/add.svg";
import ActionIcon from "@/shared/assets/icons/actions.svg";
import AgentIcon from "@/shared/assets/icons/adminusers.svg";

const AgentsPage: React.FC = () => {
    return (
        <div className="">
            <div className="flex flex-row items-end justify-between mb-6">
                {/* Button */}
                <button className="flex flex-col items-center justify-center px-4 py-2 bg-[var(--ires-dark-blue)] text-white rounded hover:bg-[var(--ires-navy-blue)] w-full sm:w-auto">
                    <img src={AddIcon} alt="Add Agent" className="h-5 mb-2" />
                    <span className="text-sm font-semibold">Create Agent</span>
                </button>
                {/* Search */}
                <div>
                    <input
                        type="text"
                        placeholder="Search ID"
                        className="px-4 py-2 border border-gray-300 rounded"
                    />
                </div>
            </div>
            {/* Table */}
            
        </div>
    );
};

export default AgentsPage;