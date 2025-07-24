import React, { useState } from "react";
import type { User } from "@/features/admin/components/EditAdminModal";
import EditAdminModal from "@/features/admin/components/EditAdminModal";
import ConfirmModal from "@/features/admin/components/ConfirmModal";

import PersonIcon from "@/shared/assets/icons/Vector.svg";
import EmailIcon from "@/shared/assets/icons/icon.svg";
import RoleIcon from "@/shared/assets/icons/Shield.svg";
import ActionsIcon from "@/shared/assets/icons/Group.svg";
import GreenDot from "@/shared/assets/icons/Ellipse 8.svg";
import RedDot from "@/shared/assets/icons/Ellipse 9.svg";
import Pen from "@/shared/assets/icons/pen.svg";
import Scissors from "@/shared/assets/icons/scissors.svg";
import Trash from "@/shared/assets/icons/delete.svg";

interface UserTableProps {
  users: User[];
  onEditUser: (u: User) => void;
  onDeactivateUser: (id: number) => void;
  onDeleteUser: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onEditUser,
  onDeactivateUser,
  onDeleteUser,
}) => {
  // State for edit modal
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // State for confirm modal (both type and user stored together)
  const [confirming, setConfirming] = useState<{
    type: "deactivate" | "delete";
    user: User;
  } | null>(null);

  return (
    <div className="overflow-auto mt-6">
      <table className="w-full table-auto text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2">
              <div className="flex items-center gap-2">
                <img src={PersonIcon} className="h-4" alt="person" />
                <span>Name</span>
              </div>
            </th>
            <th className="px-4 py-2">
              <div className="flex items-center gap-2">
                <img src={EmailIcon} className="h-4" alt="email" />
                <span>Email</span>
              </div>
            </th>
            <th className="px-4 py-2">
              <div className="flex items-center gap-2">
                <img src={RoleIcon} className="h-4" alt="role" />
                <span>Role</span>
              </div>
            </th>
            <th className="px-4 py-2">
              <span>Status</span>
            </th>
            <th className="px-4 py-2">
              <div className="flex items-center gap-2">
                <img src={ActionsIcon} className="h-4" alt="actions" />
                <span>Actions</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2">
                {user.firstName} {user.lastName}
              </td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <img
                    src={user.status === "Active" ? GreenDot : RedDot}
                    className="h-3"
                    alt={user.status}
                  />
                  {user.status}
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="flex items-center gap-1 bg-gray-300 rounded px-2 py-1 text-xs"
                  >
                    Edit <img src={Pen} className="h-3" alt="edit" />
                  </button>

                  <button
                    onClick={() => setConfirming({ type: "deactivate", user })}
                    className="flex items-center gap-1 bg-red-100 rounded px-2 py-1 text-xs"
                  >
                    Deactivate{" "}
                    <img src={Scissors} className="h-3" alt="deactivate" />
                  </button>

                  <img
                    src={Trash}
                    onClick={() => setConfirming({ type: "delete", user })}
                    className="h-4 cursor-pointer"
                    alt="delete"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit modal */}
      {editingUser && (
        <EditAdminModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={(updatedUser) => {
            onEditUser(updatedUser);
            setEditingUser(null);
          }}
        />
      )}

      {/* Confirm modal */}
      {confirming && (
        <ConfirmModal
          type={confirming.type}
          userName={`${confirming.user.firstName} ${confirming.user.lastName}`}
          onConfirm={() => {
            if (confirming.type === "deactivate") {
              onDeactivateUser(confirming.user.id);
            } else {
              onDeleteUser(confirming.user.id);
            }
            setConfirming(null);
          }}
          onClose={() => setConfirming(null)}
        />
      )}
    </div>
  );
};

export default UserTable;
