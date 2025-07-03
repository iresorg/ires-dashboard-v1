import React, { useState } from "react";
import Plus from "@/shared/assets/icons/Frame 12.svg";
import Search from "@/shared/assets/icons/lineicons_search-2.svg";
import Filter from "@/shared/assets/icons/uiw_filter.svg";
import UserTable from "@/features/users/components/UserTable";

const UsersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const users = [
    {
      id: 1,
      name: "Lexis Colenial",
      email: "lexiscole@gmail.com",
      role: "Agent Admin",
      status: "Inactive",
      actions: "Edit",
    },
    {
      id: 2,
      name: "Robert Fox",
      email: "robert.fox@gmail.com",
      role: "Super Admin",
      status: "Active",
      actions: "Edit",
    },
    {
      id: 3,
      name: "Esther Howard",
      email: "mark@gmail.com",
      role: "Agent Admin",
      status: "Inactive",
      actions: "Edit",
    },
    {
      id: 4,
      name: "Jenny Wilson",
      email: "jenny.wilson@gmail.com",
      role: "Responder Admin",
      status: "Inactive",
      actions: "Edit",
    },
    {
      id: 5,
      name: "Jacob Jones",
      email: "ralph.edwards@gmail.com",
      role: "Responder Admin",
      status: "Active",
      actions: "Edit",
    },
    {
      id: 6,
      name: "Albert Flores",
      email: "albert.flores@gmail.com",
      role: "Agent Admin",
      status: "Inactive",
      actions: "Edit",
    },
    {
      id: 7,
      name: "Annette Black",
      email: "annette.black@gmail.com",
      role: "Agent Admin",
      status: "Active",
      actions: "Edit",
    },
  ];

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-hidden px-4 py-2">
      <div className="flex flex-row justify-between">
        <div className="bg-[#0C0E5D] w-40 flex flex-col h-20 pt-2 rounded-sm items-center">
          <img src={Plus} className="h-10 pb-3" />
          <p className="text-[#FFFFFF]">Add New Admin</p>
        </div>

        <div className="flex flex-row">
          <div className="flex items-center bg-[#D9D9D9] rounded-sm px-4 h-12 w-64">
            <img src={Search} className="h-6 mr-2" />
            <input
              type="text"
              placeholder="Search Name/Email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm w-full placeholder:text-gray-600"
            />
          </div>

          <div className="flex items-center bg-[#D9D9D9] ml-4 rounded-sm px-4 h-12 w-36">
            <img src={Filter} className="h-6 mr-2" />
            <select
              className="bg-transparent outline-none text-sm text-gray-700"
              defaultValue=""
            >
              <option value="" disabled>
                Filter by Role
              </option>
              <option value="Agent Admin">Agent Admin</option>
              <option value="Responder Admin">Responder Admin</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <UserTable users={filteredUsers} />

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-4">
        <button className="text-gray-400 cursor-not-allowed px-3 py-1">
          ← Previous
        </button>
        <button className="bg-blue-900 text-white px-3 py-1 rounded-full">
          1
        </button>
        <button className="text-gray-700 hover:bg-gray-200 px-3 py-1 rounded-full">
          2
        </button>
        <button className="text-gray-700 hover:bg-gray-200 px-3 py-1 rounded-full">
          3
        </button>
        <span className="text-gray-500 px-2">...</span>
        <button className="text-gray-700 hover:bg-gray-200 px-3 py-1">
          Next →
        </button>
      </div>
    </div>
  );
};

export default UsersPage;
