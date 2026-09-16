import React from "react";

const UserTableSkeletonRow: React.FC = () => {
  return (
    <tr className="border-t">
      {/* Avatar column */}
      <td className="px-0 py-1">
        <div className="flex items-center justify-start">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
        </div>
      </td>
      
      {/* Full Name column */}
      <td className="px-4 py-1">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
      </td>
      
      {/* Email column */}
      <td className="px-4 py-1">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
      </td>
      
      {/* Role column */}
      <td className="px-4 py-1">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
      </td>
      
      {/* Status column */}
      <td className="px-4 py-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
        </div>
      </td>
      
      {/* Actions column */}
      <td className="px-4 py-1">
        <div className="flex items-center gap-3">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-12"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </td>
    </tr>
  );
};

export default UserTableSkeletonRow; 