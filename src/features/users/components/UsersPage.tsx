import React, { useState } from "react";
import AddIcon from "@/shared/assets/icons/add.svg";
import Search from "@/shared/assets/icons/lineicons_search-2.svg";
import Filter from "@/shared/assets/icons/uiw_filter.svg";
import ArrowLeft from "@/shared/assets/icons/arrowleft.svg";
import ArrowRight from "@/shared/assets/icons/arrowright.svg";
import UserTable from "@/features/users/components/UserTable";
import AddAdminModal from "@/features/admin/components/AddAdminModal";
import AddAdminSuccessModal from "@/features/admin/components/AddAdminSuccessModal";
import EditAdminSuccessModal from "@/features/admin/EditAdminSucessModal";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  firstName: string;
  lastName: string;
}

const UsersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [showAddSuccessModal, setShowAddSuccessModal] = useState(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);
  const [submittedAdmin, setSubmittedAdmin] = useState<{
    firstName: string;
    lastName: string;
    role: string;
  } | null>(null);
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Lexis Colenial",
      firstName: "Lexis",
      lastName: "Colenial",
      email: "lexiscole@gmail.com",
      role: "Agent Admin",
      status: "Inactive",
    },
    {
      id: 2,
      name: "Robert Fox",
      firstName: "Robert",
      lastName: "Fox",
      email: "robert.fox@gmail.com",
      role: "Super Admin",
      status: "Active",
    },
    {
      id: 3,
      name: "Esther Howard",
      firstName: "Esther",
      lastName: "Howard",
      email: "mark@gmail.com",
      role: "Agent Admin",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Jenny Wilson",
      firstName: "Jenny",
      lastName: "Wilson",
      email: "jenny.wilson@gmail.com",
      role: "Responder Admin",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Jacob Jones",
      firstName: "Jacob",
      lastName: "Jones",
      email: "ralph.edwards@gmail.com",
      role: "Responder Admin",
      status: "Active",
    },
    {
      id: 6,
      name: "Albert Flores",
      firstName: "Albert",
      lastName: "Flores",
      email: "albert.flores@gmail.com",
      role: "Agent Admin",
      status: "Inactive",
    },
    {
      id: 7,
      name: "Annette Black",
      firstName: "Annette",
      lastName: "Black",
      email: "annette.black@gmail.com",
      role: "Agent Admin",
      status: "Active",
    },
  ]);

  const addNewAdmin = (newAdmin: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }) => {
    const newUser: User = {
      id: users.length + 1,
      name: `${newAdmin.firstName} ${newAdmin.lastName}`,
      firstName: newAdmin.firstName,
      lastName: newAdmin.lastName,
      email: newAdmin.email,
      role: newAdmin.role,
      status: "Active",
    };
    console.log("Adding new admin:", newUser);
    setUsers([...users, newUser]);
    setSubmittedAdmin({
      firstName: newAdmin.firstName,
      lastName: newAdmin.lastName,
      role: newAdmin.role,
    });
    setShowAddSuccessModal(true);
    setShowAddAdminModal(false);
  };

  const editAdmin = (updatedUser: any) => {
    console.log("Editing admin with data:", updatedUser);
    setUsers(
      users.map((user) =>
        user.id === updatedUser.id
          ? {
              ...user,
              ...updatedUser,
              name: `${updatedUser.firstName} ${updatedUser.lastName}`,
            }
          : user
      )
    );
    setSubmittedAdmin({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      role: updatedUser.role,
    });
    setShowEditSuccessModal(true);
  };

  const deactivateAdmin = (userId: number) => {
    console.log("Deactivating user with ID:", userId);
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: "Inactive" } : user
      )
    );
  };

  const deleteAdmin = (userId: number) => {
    console.log("Deleting user with ID:", userId);
    setUsers(users.filter((user) => user.id !== userId));
  };

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-hidden px-4 py-2">
      <div className="flex flex-row justify-between">
        <button
          onClick={() => setShowAddAdminModal(true)}
          className="flex flex-col items-center justify-center px-6 py-3 bg-[var(--ires-dark-blue)] text-white rounded-lg hover:bg-[var(--ires-navy-blue)]"
        >
          <img src={AddIcon} alt="Add Admin" className="h-5 mb-1" />
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

      <UserTable
        users={filteredUsers}
        onEditUser={editAdmin}
        onDeactivateUser={deactivateAdmin}
        onDeleteUser={deleteAdmin}
      />

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

      {showAddAdminModal && (
        <AddAdminModal
          onClose={() => setShowAddAdminModal(false)}
          onAddAdmin={addNewAdmin}
        />
      )}

      {showAddSuccessModal && submittedAdmin && (
        <AddAdminSuccessModal
          onClose={() => setShowAddSuccessModal(false)}
          firstName={submittedAdmin.firstName}
          lastName={submittedAdmin.lastName}
          role={submittedAdmin.role}
        />
      )}

      {showEditSuccessModal && submittedAdmin && (
        <EditAdminSuccessModal
          onClose={() => {
            console.log("Closing EditAdminSuccessModal");
            setShowEditSuccessModal(false);
          }}
          firstName={submittedAdmin.firstName}
          lastName={submittedAdmin.lastName}
          role={submittedAdmin.role}
        />
      )}
    </div>
  );
};

export default UsersPage;