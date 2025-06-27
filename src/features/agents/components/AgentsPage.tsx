import React from 'react';
import AddIcon from "@/shared/assets/icons/add.svg";
import ActionIcon from "@/shared/assets/icons/actions.svg";
import AgentIcon from "@/shared/assets/icons/adminusers.svg";
import SearchIcon from "@/shared/assets/icons/search.svg";
// import { ThemeProvider } from "@/shared/ThemeContext";

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
                <div className="relative flex items-center bottom-5">
            <img
                src={SearchIcon}
                alt="Search Icon"
                className="absolute top-3 left-3 h-4 text-gray-400 pointer-events-none"
            />
            <input
                type="text"
                placeholder="Search ID"
                className="pl-10 pr-4 py-2 bg-gray-300 border border-gray-300 rounded-xl text-center"
            />
        </div>
            </div>
            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full text-sm dark:text-black">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="py-3 px-4 font-semibold whitespace-nowrap">
                                <span className="inline-flex items-center gap-2">
                                    <img src={AgentIcon} alt="Agent" className="h-5" />
                                    <span>Agent ID</span>
                                </span>
                            </th>
                            <th className="py-3 px-4 font-semibold whitespace-nowrap">Status</th>
                            <th className="py-3 px-4 font-semibold whitespace-nowrap">Created At</th>
                            <th className="py-3 px-4 font-semibold whitespace-nowrap">Updated At</th>
                            <th className="py-3 px-4 font-semibold whitespace-nowrap text-center">
                                <span className="inline-flex items-center gap-2">
                                    <img src={ActionIcon} alt="Actions" className="h-5" />
                                    <span>Actions</span>
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-left">
                        {/* Agent 1 */}
                        <tr className="border-b">
                            <td className="py-3 px-4 whitespace-nowrap">AGNT117J</td>
                            <td className="py-3 px-4 whitespace-nowrap">
                                <span className="inline-flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                    <span className="text-green-600">Active</span>
                                </span>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">2025-06-01</td>
                            <td className="py-3 px-4 whitespace-nowrap">2025-06-20</td>
                            <td className="py-3 px-4 whitespace-nowrap">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 w-full sm:w-auto">
                                        View Details
                                    </button>
                                    <button className="px-3 py-1 rounded bg-red-100 hover:bg-red-200 w-full sm:w-auto">
                                        Manage Tokens
                                    </button>
                                </div>
                            </td>
                        </tr>
                        {/* Agent 2 */}
                        <tr className="border-b">
                            <td className="py-3 px-4 whitespace-nowrap">AGNT17J</td>
                            <td className="py-3 px-4 whitespace-nowrap">
                                <span className="inline-flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                    <span className="text-red-600">Inactive</span>
                                </span>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">2025-06-05</td>
                            <td className="py-3 px-4 whitespace-nowrap">2025-06-10</td>
                            <td className="py-3 px-4 whitespace-nowrap">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 w-full sm:w-auto">
                                        View Details
                                    </button>
                                    <button className="px-3 py-1 rounded bg-red-100 hover:bg-red-200 w-full sm:w-auto">
                                        Manage Tokens
                                    </button>
                                </div>
                            </td>
                        </tr>
                        {/* Agent 3 */}
                        <tr className="border-b">
                            <td className="py-3 px-4 whitespace-nowrap">AGNT117J</td>
                            <td className="py-3 px-4 whitespace-nowrap">
                                <span className="inline-flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                    <span className="text-green-600">Active</span>
                                </span>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">2025-06-01</td>
                            <td className="py-3 px-4 whitespace-nowrap">2025-06-20</td>
                            <td className="py-3 px-4 whitespace-nowrap">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 w-full sm:w-auto">
                                        View Details
                                    </button>
                                    <button className="px-3 py-1 rounded bg-red-100 hover:bg-red-200 w-full sm:w-auto">
                                        Manage Tokens
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            
        </div>
        
    );
};

export default AgentsPage;