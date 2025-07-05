import React, { useState } from "react";
import AddIcon from "@/shared/assets/icons/add.svg";
import Search from "@/shared/assets/icons/lineicons_search-2.svg";
import Filter from "@/shared/assets/icons/uiw_filter.svg";
import UserTable from "@/features/users/components/UserTable";
import ArrowLeft from "@/shared/assets/icons/arrowleft.svg";
import ArrowRight from "@/shared/assets/icons/arrowright.svg";

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
        <button className="flex flex-col items-center justify-center px-6 py-3 bg-[var(--ires-dark-blue)] text-white rounded-lg hover:bg-[var(--ires-navy-blue)]">
          <img src={AddIcon} alt="Add Agent" className="h-5 mb-1" />
          <span className="text-sm font-semibold">Add New Admin</span>
        </button>

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
      <div className="flex items-center justify-center space-x-2 mt-20 text-sm text-gray-700">
        <button className="flex items-center gap-1 text-gray-400 cursor-not-allowed px-3 py-1">
          <img src={ArrowLeft} alt="Previous" className="h-4" />
          Previous
        </button>

        <button className="bg-[#0C0E5D] text-white px-3 py-1 rounded-sm">
          1
        </button>
        <button className="hover:bg-gray-200 px-3 py-1 rounded-full">2</button>
        <button className="hover:bg-gray-200 px-3 py-1 rounded-full">3</button>
        <span className="text-gray-500 px-1">...</span>
        <button className="flex items-center gap-1 text-[#0C0E5D] px-3 py-1 font-medium hover:underline">
          Next
          <img src={ArrowRight} alt="Next" className="h-4" />
        </button>
      </div>
    </div>
  );
};

export default UsersPage;
