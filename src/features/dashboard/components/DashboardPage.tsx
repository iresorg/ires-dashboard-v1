import React from "react";
import DashboardStats from "./DashboardStats";
import ArrowLeft from "@/shared/assets/icons/arrowleft.svg";
import ArrowRight from "@/shared/assets/icons/ArrowRight.svg";
import Person from "@shared/assets/icons/Vector.svg";
import Role from "@shared/assets/icons/Shield.svg";
import ActivityIcon from "@/shared/assets/icons/activity-icon.svg";
import TimeIcon from "@/shared/assets/icons/time-icon.svg";


const recentActivity = [
  {
    user: "Guy Hawkins",
    role: "Agent Admin",
    activity: "Logged in",
    timestamp: "2025-06-29 12:30pm",
  },
  {
    user: "Eleanor Pena",
    role: "Responder Admin",
    activity: "Updated Profile",
    timestamp: "2025-07-01 10:20am",
  },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col space-y-10 min-h-full">
      {/* Stats Section */}
      <DashboardStats />

      {/* Recent Activity Table */}
      <div className="p-6 flex-1 flex flex-col overflow-hidden">
        <h3 className="text-lg font-bold mb-4 text-[#0C0E5D]">Recent</h3>

        {/* Table Scroll Area */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left min-w-[600px] text-black">
            <thead className="font-bold">
              <tr className="border-b">
                <th className="w-[200px] px-4 py-2 text-left">
                  <div className="flex items-center">
                    <img src={Person} className="h-4 pr-2" />
                    <span>User</span>
                  </div>
                </th>
                <th className="w-[150px] px-4 py-2 text-left">
                  <div className="flex items-center space-x-2">
                    <img src={Role} className="h-4" />
                    <span>Role</span>
                  </div>
                </th>
                <th className="w-[150px] px-4 py-2 text-left">
                  <div className="flex items-center space-x-2">
                    <img src={ActivityIcon} className="h-4" />
                    <span>Activity</span>
                  </div>
                </th>
                <th className="w-[200px] px-4 py-2 text-left">
                  <div className="flex items-center">
                    <img src={TimeIcon} className="h-4 pr-2" />
                    <span>Timestamp</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{item.user}</td>
                  <td className="py-3 px-4">{item.role}</td>
                  <td className="py-3 px-4">{item.activity}</td>
                  <td className="py-3 px-4">{item.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2 mt-6 text-sm text-gray-700">
          <button className="flex items-center gap-1 text-gray-400 cursor-not-allowed px-3 py-1">
            <img src={ArrowLeft} alt="Previous" className="h-4" />
            Previous
          </button>
          <button className="bg-[#0C0E5D] text-white px-3 py-1 rounded-sm">
            1
          </button>
          <button className="hover:bg-gray-200 px-3 py-1 rounded-sm">2</button>
          <button className="hover:bg-gray-200 px-3 py-1 rounded-sm">3</button>
          <span className="text-gray-500 px-1">...</span>
          <button className="flex items-center gap-1 text-[#0C0E5D] px-3 py-1 font-medium hover:underline">
            Next
            <img src={ArrowRight} alt="Next" className="h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
