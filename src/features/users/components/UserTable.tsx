import React, { useState } from "react";
import RedButton from "@/shared/assets/icons/Ellipse 9.svg";
import GreenButton from "@shared/assets/icons/Ellipse 8.svg";
import Person from "@shared/assets/icons/Vector.svg";
import Email from "@shared/assets/icons/icon.svg";
import Role from "@shared/assets/icons/Shield.svg";
import Actions from "@shared/assets/icons/Group.svg";
import Pen from "@shared/assets/icons/pen.svg";
import Scissors from "@shared/assets/icons/scissors.svg";
import Delete from "@shared/assets/icons/delete.svg";
import EditAdminModal from "@/features/admin/components/EditAdminModal";
import ConfirmModal from "@/features/admin/components/ConfirmModal";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface InternalUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
}

interface UserTableProps {
  users: AdminUser[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [editingUser, setEditingUser] = useState<InternalUser | null>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [confirmType, setConfirmType] = useState<
    "deactivate" | "delete" | null
  >(null);

  const handleEdit = (user: AdminUser) => {
    const [firstName = "", lastName = ""] = user.name.split(" ");
    setEditingUser({
      id: user.id,
      firstName,
      lastName,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  };

  const handleConfirm = () => {
    console.log(`${confirmType} confirmed for user`, selectedUser?.name);
    setConfirmType(null);
    setSelectedUser(null);
  };

  const handleSaveEdit = (updatedUser: InternalUser) => {
    console.log("Updated user data:", updatedUser);
    setEditingUser(null);
  };

  return (
    <div className="flex-1 overflow-auto mt-4">
      <table className="min-w-full table-fixed border-collapse text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="w-[200px] px-4 py-2 text-left">
              <div className="flex items-center">
                <img src={Person} className="h-4 pr-2" />
                <span>Full Name</span>
              </div>
            </th>
            <th className="w-[250px] px-4 py-2 text-left">
              <div className="flex items-center space-x-2">
                <img src={Email} className="h-4" />
                <span>Email</span>
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
                <img src={GreenButton} className="h-4" />
                <span>Status</span>
              </div>
            </th>
            <th className="w-[200px] px-4 py-2 text-left">
              <div className="flex items-center space-x-2">
                <img src={Actions} className="h-4" />
                <span>Actions</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-[#D4CDCD]">
              <td className="px-4 py-4">{user.name}</td>
              <td className="px-4 py-4">{user.email}</td>
              <td className="px-4 py-4">{user.role}</td>
              <td className="px-4 py-4 flex items-center space-x-2">
                <img
                  src={user.status === "Active" ? GreenButton : RedButton}
                  className="h-4 w-4"
                />
                <span>{user.status}</span>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleEdit(user)}
                    className="flex items-center space-x-1 bg-[#D9D9D9] pl-2 pr-5 rounded-sm"
                  >
                    <span className="text-sm">Edit</span>
                    <img src={Pen} className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setConfirmType("deactivate");
                    }}
                    className="flex items-center bg-[#D00F24]/11 pl-2 pr-5 rounded-sm"
                  >
                    <span className="text-sm">Deactivate</span>
                    <img src={Scissors} className="h-3 w-3" />
                  </button>
                  <img
                    src={Delete}
                    onClick={() => {
                      setSelectedUser(user);
                      setConfirmType("delete");
                    }}
                    className="h-4 w-4 cursor-pointer"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Admin Modal */}
      {editingUser && (
        <EditAdminModal
          user={editingUser}
          onSave={handleSaveEdit}
          onClose={() => setEditingUser(null)}
        />
      )}

      {/* Confirm Modal */}
      {confirmType && selectedUser && (
        <ConfirmModal
          type={confirmType}
          userName={selectedUser.name}
          onConfirm={handleConfirm}
          onClose={() => {
            setConfirmType(null);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UserTable;
