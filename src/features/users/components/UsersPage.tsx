"use client";
import React, { useState } from "react";
import UserTable from "@/features/users/components/UserTable";
import AddAdminModal from "@/features/admin/components/AddAdminModal";
import AddAdminSuccessModal from "@/features/admin/components/AddAdminSuccessModal";
import EditAdminSuccessModal from "@/features/admin/EditAdminSucessModal";
import type { User } from "@/features/admin/components/EditAdminModal";

import AddIcon from "@/shared/assets/icons/add.svg";
import SearchIcon from "@/shared/assets/icons/lineicons_search-2.svg";
import FilterIcon from "@/shared/assets/icons/uiw_filter.svg";
import ArrowLeft from "@/shared/assets/icons/arrowleft.svg";
import ArrowRight from "@/shared/assets/icons/arrowright.svg";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      firstName: "Lexis",
      lastName: "Colenial",
      email: "lexiscole@gmail.com",
      role: "Agent Admin",
      status: "Inactive",
    },
    {
      id: 2,
      firstName: "Robert",
      lastName: "Fox",
      email: "robert.fox@gmail.com",
      role: "Super Admin",
      status: "Active",
    },
    {
      id: 3,
      firstName: "Esther",
      lastName: "Howard",
      email: "estherhoward@gmail.com",
      role: "Agent Admin",
      status: "Inactive",
    },
    {
      id: 4,
      firstName: "Jenny",
      lastName: "Wilson",
      email: "jenny.wilson@gmail.com",
      role: "Responder Admin",
      status: "Active",
    },
    {
      id: 5,
      firstName: "William",
      lastName: "Ash",
      email: "william.ash@gmail.com",
      role: "Agent Admin",
      status: "Active",
    },
    {
      id: 6,
      firstName: "Amarn",
      lastName: "Beecot",
      email: "amarn.beecot@gmail.com",
      role: "Super Admin",
      status: "Inactive",
    },
    {
      id: 7,
      firstName: "Loveth",
      lastName: "Jerry",
      email: "loveth.jerry@gmail.com",
      role: "Responder Admin",
      status: "Active",
    },
    {
      id: 8,
      firstName: "David",
      lastName: "Cole",
      email: "david.cole@gmail.com",
      role: "Agent Admin",
      status: "Active",
    },
    {
      id: 9,
      firstName: "Micheal",
      lastName: "Luke",
      email: "micheal.luke@gmail.com",
      role: "Responder Admin",
      status: "Inactive",
    },
    {
      id: 10,
      firstName: "Bento",
      lastName: "Black",
      email: "bento.black@gmail.com",
      role: "Super Admin",
      status: "Active",
    },
    {
      id: 11,
      firstName: "Rose",
      lastName: "Gail",
      email: "rose.gail@gmail.com",
      role: "Responder Admin",
      status: "Inactive",
    },
  ]);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [showEditSuccess, setShowEditSuccess] = useState(false);
  const [submitted, setSubmitted] = useState<{
    firstName: string;
    lastName: string;
    role: string;
  } | null>(null);

  const addAdmin = (newAdmin: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }) => {
    const newUser: User = {
      id: users.length + 1,
      firstName: newAdmin.firstName,
      lastName: newAdmin.lastName,
      email: newAdmin.email,
      role: newAdmin.role,
      status: "Active",
    };
    setUsers([...users, newUser]);
    setSubmitted({
      firstName: newAdmin.firstName,
      lastName: newAdmin.lastName,
      role: newAdmin.role,
    });
    setShowAdd(false);
    setShowAddSuccess(true);
  };

  const editAdmin = (u: User) => {
    setUsers(users.map((item) => (item.id === u.id ? u : item)));
    setSubmitted({
      firstName: u.firstName,
      lastName: u.lastName,
      role: u.role,
    });
    setShowEditSuccess(true);
  };

  const deactivateAdmin = (id: number) =>
    setUsers(
      users.map((u) => (u.id === id ? { ...u, status: "Inactive" } : u))
    );

  const deleteAdmin = (id: number) =>
    setUsers(users.filter((u) => u.id !== id));

  const filtered = users.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex justify-between">
        <button
          onClick={() => setShowAdd(true)}
          className="flex flex-col items-center bg-[var(--ires-dark-blue)] text-white px-4 py-3 rounded-lg -mt-5"
        >
          <img src={AddIcon} className="h-5 mb-1" />
          <span className="text-sm">Add New Admin</span>
        </button>

        <div className="flex gap-4">
          <div className="flex items-center bg-gray-200 rounded px-3 -mt-5">
            <img src={SearchIcon} className="h-4 mr-2" />
            <input
              className="bg-transparent outline-none text-sm"
              placeholder="Search Name/Email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center bg-gray-200 rounded px-3 -mt-5">
            <img src={FilterIcon} className="h-4 mr-2" />
            <select className="bg-transparent outline-none text-sm">
              <option>Filter by Role</option>
              <option>Super Admin</option>
              <option>Agent Admin</option>
              <option>Responder Admin</option>
            </select>
          </div>
        </div>
      </div>

      <UserTable
        users={filtered}
        onEditUser={editAdmin}
        onDeactivateUser={deactivateAdmin}
        onDeleteUser={deleteAdmin}
      />

      <div className="flex justify-center items-center gap-2 mt-8">
        <button className="text-gray-400 flex items-center gap-1">
          <img src={ArrowLeft} className="h-4" />
          Prev
        </button>
        <button className="bg-[#0C0E5D] text-white px-3 py-1 rounded">1</button>
        <button className="px-3 py-1">2</button>
        <button className="px-3 py-1">3</button>
        <button className="text-[#0C0E5D] flex items-center gap-1">
          Next
          <img src={ArrowRight} className="h-4" />
        </button>
      </div>

      {showAdd && (
        <AddAdminModal
          onClose={() => setShowAdd(false)}
          onAddAdmin={addAdmin}
        />
      )}
      {showAddSuccess && submitted && (
        <AddAdminSuccessModal
          onClose={() => setShowAddSuccess(false)}
          {...submitted}
        />
      )}
      {showEditSuccess && submitted && (
        <EditAdminSuccessModal
          onClose={() => setShowEditSuccess(false)}
          {...submitted}
        />
      )}
    </div>
  );
};

export default UsersPage;