import React, { useState } from "react";
import DashboardStats from "./DashboardStats";
import Pagination from "@/shared/components/ui/Pagination";
import Person from "@shared/assets/icons/Vector.svg";
import Role from "@shared/assets/icons/Shield.svg";
import ActivityIcon from "@/shared/assets/icons/activity-icon.svg";
import TimeIcon from "@/shared/assets/icons/time-icon.svg";

interface Activity {
  user: string;
  role: string;
  activity: string;
  timestamp: string;
}

const recentActivity: Activity[] = [
  {
    user: "Guy Hawkins",
    role: "Agent Admin",
    activity: "Logged in",
    timestamp: "2025-06-29 12:30pm",
  },
  {
    user: "Simisola Olubodun",
    role: "Responder Admin",
    activity: "Updated Profile",
    timestamp: "2025-07-01 10:20am",
  },
];

const DashboardPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 4;

  const totalPages = Math.ceil(recentActivity.length / activitiesPerPage);
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = recentActivity.slice(
    indexOfFirstActivity,
    indexOfLastActivity
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
              {currentActivities.map((item, index) => (
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-6"
        />
      </div>
    </div>
  );
};

export default DashboardPage;
