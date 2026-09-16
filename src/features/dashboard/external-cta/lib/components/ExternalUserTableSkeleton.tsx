import React from "react";

const ExternalUserTableSkeleton: React.FC = () => {
    return (
        <>
            {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    </td>
                    <td className="p-4">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
                    </td>
                    <td className="p-4">
                        <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>
                    </td>
                    <td className="p-4">
                        <div className="h-6 bg-gray-200 rounded-full animate-pulse w-24"></div>
                    </td>
                    <td className="p-4">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                    </td>
                    <td className="p-4">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default ExternalUserTableSkeleton;

