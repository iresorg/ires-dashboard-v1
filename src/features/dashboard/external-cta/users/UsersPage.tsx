"use client";

import { useState } from "react";

import Search from "@/shared/assets/icons/lineicons_search-2.svg";
import Filter from "@/shared/assets/icons/uiw_filter.svg";

import Pagination from "@/shared/components/ui/Pagination";

interface UserRow {
  name: string;
  email: string;
  role: string;
  verified: boolean;
  phone: string;
  joined: string;
}

const initialUsers: UserRow[] = [
  {
    name: "Courtney Henry",
    email: "courtneyhenry1@gmail.com",
    role: "Individual",
    verified: true,
    phone: "+234 810 000 0000",
    joined: "2025-10-24",
  },
  {
    name: "Jacob Jones",
    email: "jacob.jones34@gmail.com",
    role: "Individual",
    verified: false,
    phone: "+234 810 000 0000",
    joined: "2025-10-17",
  },
  {
    name: "BUA Group",
    email: "alexjohn@buagroup.com",
    role: "Organization",
    verified: true,
    phone: "+234 810 000 0000",
    joined: "2025-10-08",
  },
  {
    name: "UNICEF",
    email: "jasminerock1@unicef.com",
    role: "Organization",
    verified: true,
    phone: "+234 810 000 0000",
    joined: "2025-09-30",
  },
  {
    name: "Jerome Bell",
    email: "jeromebell036@gmail.com",
    role: "Individual",
    verified: false,
    phone: "+234 810 000 0000",
    joined: "2025-09-12",
  },
  {
    name: "Wade Warren",
    email: "wade.warren43@gmail.com",
    role: "Individual",
    verified: true,
    phone: "+234 810 000 0000",
    joined: "2025-09-06",
  },
];

export default function CTAUsersPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  // FILTER
  const filtered = initialUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // PAGINATION CALCULATION
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = filtered.slice(indexOfFirst, indexOfLast);

  return (
    <div className="w-full">
      {/* Search and Filter */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center w-[350px] bg-[#D9D9D9] rounded-lg px-4 py-2 text-gray-700">
          <img src={Search} className="w-5 h-5 mr-2" alt="Search" />
          <input
            type="text"
            placeholder="Search Name / Email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className=" w-full outline-none text-sm"
          />
        </div>

        <button className="flex items-center bg-[#D9D9D9] rounded-lg px-4 py-2 text-sm text-gray-700">
          <img src={Filter} className="w-5 h-5 mr-2" alt="Filter" />
          Filter by Role/Email Verified/Joined Date
        </button>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold mb-4">
        View and manage all user accounts
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-[#F2F2F2]">
            <tr>
              <th className="text-center p-3">Full Name</th>
              <th className="text-center p-3">Email</th>
              <th className="text-center p-3">Role</th>
              <th className="text-center p-3">Email Verified</th>
              <th className="text-center p-3">Phone Number</th>
              <th className="text-center p-3">Joined Date</th>
              <th className="text-center p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((user, index) => (
              <tr key={index} className="border-b border-[#D4CDCD]">
                <td className="p-3 text-xs">{user.name}</td>
                <td className="p-3 text-xs">{user.email}</td>
                <td className="p-3 text-xs">{user.role}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-lg text-[#000000] text-xs ${
                      user.verified ? "bg-[#2CDB3E]" : "bg-[#F94C4C]"
                    }`}
                  >
                    {user.verified ? "Verified" : "Not Verified"}
                  </span>
                </td>

                <td className="p-3 text-xs">{user.phone}</td>
                <td className="p-3 text-xs">{user.joined}</td>

                <td className="p-3 text-xs">
                  <button className="px-4 py-2 bg-[#C5C5C5] rounded-lg text-xs  transition font-semibold hover:bg-[#A8A8A8] cursor-pointer">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="mt-6"
      />
    </div>
  );
}
