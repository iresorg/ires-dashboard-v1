import React, { useState } from "react";
import type { User } from "@/features/admin/components/EditAdminModal";
import EditAdminModal from "@/features/admin/components/EditAdminModal";
import ConfirmModal from "@/features/admin/components/ConfirmModal";
import type { UserProfile } from "../services/userService";

import PersonIcon from "@/shared/assets/icons/Vector.svg";
import EmailIcon from "@/shared/assets/icons/icon.svg";
import RoleIcon from "@/shared/assets/icons/Shield.svg";
import ActionsIcon from "@/shared/assets/icons/Group.svg";
import GreenDot from "@/shared/assets/icons/Ellipse 8.svg";
import RedDot from "@/shared/assets/icons/Ellipse 9.svg";
import Pen from "@/shared/assets/icons/pen.svg";
import Scissors from "@/shared/assets/icons/scissors.svg";
import Trash from "@/shared/assets/icons/delete.svg";
import ProfileImage from "@/shared/assets/images/profile.png";


interface UserTableProps {
  users: UserProfile[];
  onEditUser: (u: User) => void;
  onDeactivateUser: (id: number) => void;
  onDeleteUser: (id: number) => void;
  isLoading?: boolean;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onEditUser,
  onDeactivateUser,
  onDeleteUser,
  isLoading = false,
}) => {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [confirming, setConfirming] = useState<{
    type: "deactivate" | "delete";
    user: User;
  } | null>(null);

  const SkeletonRow = () => (
    <tr className="border-t">
      <td className="px-0 py-1">
        <div className="flex items-center justify-start">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
        </div>
      </td>
      <td className="px-4 py-1">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
      </td>
      <td className="px-4 py-1">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
      </td>
      <td className="px-4 py-1">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
      </td>
      <td className="px-4 py-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
        </div>
      </td>
      <td className="px-4 py-1">
        <div className="flex items-center gap-3">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-12"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </td>
    </tr>
  );

  const EmptyState = () => (
    <tr>
      <td colSpan={6} className="py-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <img src={PersonIcon} className="h-8 w-8 text-gray-400" alt="No users" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first user to the system.</p>
          <button className="bg-[var(--ires-dark-blue) text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Add New User
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="overflow-auto mt-6">
      <table className="w-full table-auto text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-2 py-1">
              <div className="flex items-center gap-2">
                <img src={PersonIcon} className="h-4" alt="person" />
              </div>
            </th>
            <th className="px-4 py-1">
              <div className="flex items-center gap-2">
                <span>Full Name</span>
              </div>
            </th>
            <th className="px-4 py-1">
              <div className="flex items-center gap-2">
                <img src={EmailIcon} className="h-4" alt="email" />
                <span>Email</span>
              </div>
            </th>
            <th className="px-4 py-1">
              <div className="flex items-center gap-2">
                <img src={RoleIcon} className="h-4" alt="role" />
                <span>Role</span>
              </div>
            </th>
            <th className="px-4 py-1">
              <div className="flex items-center gap-2">
                <img src={GreenDot} className="h-3"></img>
                <span>Status</span>
              </div>
            </th>
            <th className="px-4 py-1">
              <div className="flex items-center gap-2">
                <img src={ActionsIcon} className="h-4" alt="actions" />
                <span>Actions</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            // Show skeleton rows when loading
            [...Array(5)].map((_, index) => (
              <SkeletonRow key={index} />
            ))
          ) : users.length === 0 ? (
            // Show empty state when no users
            <EmptyState />
          ) : (
            // Show actual data when loaded
            users.map((user) => {
              // Convert UserProfile to User format for compatibility
              const userForEdit: User = {
                id: parseInt(user.id),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                status: user.status,
              };

              return (
                <tr key={user.id} className="border-t">
                  <td className="px-0 py-1">
                    <div className="flex items-center justify-start">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-white">
                        <img src={ProfileImage}></img>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-1">
                    <span>{user.firstName} {user.lastName}</span>
                  </td>
                  <td className="px-4 py-1">{user.email}</td>
                  <td className="px-4 py-1">{user.role}</td>
                  <td className="px-4 py-1">
                    <div className="flex items-center gap-2">
                      <img
                        src={user.status === "active" ? GreenDot : RedDot}
                        className="h-3"
                        alt={user.status}
                      />
                      {user.status}
                    </div>
                  </td>
                  <td className="px-4 py-1">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setEditingUser(userForEdit)}
                        className="flex items-center gap-1 bg-gray-300 rounded px-2 py-1 text-xs"
                      >
                        Edit <img src={Pen} className="h-3" alt="edit" />
                      </button>
                      <button
                        onClick={() => setConfirming({ type: "deactivate", user: userForEdit })}
                        className="flex items-center gap-1 bg-red-100 rounded px-2 py-1 text-xs"
                      >
                        Deactivate <img src={Scissors} className="h-3" alt="deactivate" />
                      </button>
                      <img
                        src={Trash}
                        onClick={() => setConfirming({ type: "delete", user: userForEdit })}
                        className="h-4 cursor-pointer"
                        alt="delete"
                      />
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

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