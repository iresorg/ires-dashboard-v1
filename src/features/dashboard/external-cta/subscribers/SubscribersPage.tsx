"use client";

import { useState } from "react";

import Search from "@/shared/assets/icons/lineicons_search-2.svg";
import Filter from "@/shared/assets/icons/uiw_filter.svg";

import Pagination from "@/shared/components/ui/Pagination";
interface UserRow {
  name: string;
  email: string;
  role: string;
  plan: string;
  amount: string;
  startDate: string;
  endDate: string;
  status: string;
  
}


const initialUsers: UserRow[] = [
  {
    name: "Courtney Henry",
    email: "courtneyhenry1@gmail.com",
    role: "Individual",
    plan: "Safe Guard",
    amount: "#30,000.00",
    startDate: "2025-10-24",
    endDate: "2026-10-24",
    status:  "Active",
  },
  {
    name: "Courtney Henry",
    email: "courtneyhenry1@gmail.com",
    role: "Individual",
    plan: "Safe Guard",
    amount: "#30,000.00",
    startDate: "2025-10-24",
    endDate: "2026-10-24",
    status: "Canceled",
  },
  {
    name: "Courtney Henry",
    email: "courtneyhenry1@gmail.com",
    role: "Individual",
    plan: "Safe Guard",
    amount: "#30,000.00",
    startDate: "2025-10-24",
    endDate: "2026-10-24",
    status: "Active",
  },
  {
    name: "Courtney Henry",
    email: "courtneyhenry1@gmail.com",
    role: "Individual",
    plan: "Safe Guard",
    amount: "#30,000.00",
    startDate: "2025-10-24",
    endDate: "2026-10-24",
    status: "Active",
  },
  {
    name: "Courtney Henry",
    email: "courtneyhenry1@gmail.com",
    role: "Individual",
    plan: "Safe Guard",
    amount: "#30,000.00",
    startDate: "2025-10-24",
    endDate: "2026-10-24",
    status: "Expired",
  },
  {
    name: "Courtney Henry",
    email: "courtneyhenry1@gmail.com",
    role: "Individual",
    plan: "Safe Guard",
    amount: "#30,000.00",
    startDate: "2025-10-24",
    endDate: "2026-10-24",
    status: "Trial",
  },
];

export default function CTASubscribersPage() {
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
        List of users currently subscribed to our services
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-[#F2F2F2]">
            <tr>
              <th className="text-center p-3">Full Name</th>
              <th className="text-center p-3">Email</th>
              <th className="text-center p-3">Role</th>
              <th className="text-center p-3">Plan Subscribed To</th>
              <th className="text-center p-3">Amount</th>
              <th className="text-center p-3">Start Date</th>
              <th className="text-center p-3">End Date</th>
              <th className="text-center p-3">Status</th>
              <th className="text-center p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((user, index) => (
              <tr key={index} className="border-b border-[#D4CDCD]">
                <td className="p-3 text-xs">{user.name}</td>
                <td className="p-3 text-xs">{user.email}</td>
                <td className="p-3 text-xs">{user.role}</td>
                <td className="p-3 text-xs">{user.plan}</td>
                <td className="p-3 text-xs">{user.amount}</td>
                <td className="p-3 text-xs">{user.startDate}</td>
                <td className="p-3 text-xs">{user.endDate}</td>
                <td className="p-3 text-xs">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs ${
                      user.status === "Active"
                        ? "bg-[#2CDB3E] text-black"
                        : user.status === "Canceled"
                        ? "bg-[#F94C4C] text-black"
                        : user.status === "Expired"
                        ? "bg-[#F94C4C] text-black"
                        : user.status === "Trial"
                        ? "bg-[#F2C94C] text-black"
                        : ""
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

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
