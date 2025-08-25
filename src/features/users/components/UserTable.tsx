import React, { useState } from "react";
import type { User } from "@/features/admin/components/EditAdminModal";
import EditAdminModal from "@/features/admin/components/EditAdminModal";
import ConfirmModal from "@/features/admin/components/ConfirmModal";
import type { UserProfile } from "../services/userService";
import { UserTableSkeletonRow } from "@/shared/components/ui";
import { getUserInitials, getUserInitialsColor } from "@/shared/utils/userUtils";
import type { CreatableUserRole } from "@/shared/types/roles";
import { useToast } from "@/shared/components/ui/useToast";

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
  users: UserProfile[];
  onEditUser: (u: User) => void;
  onDeactivateUser: (id: string) => void;
  onActivateUser: (id: string) => void;
  onDeleteUser: (id: string) => void;
  getUserById: (userId: string) => Promise<UserProfile>;
  isLoading?: boolean;
  skeletonRows?: number;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onEditUser,
  onDeactivateUser,
  onActivateUser,
  onDeleteUser,
  getUserById,
  isLoading = false,
  skeletonRows = 10,
}) => {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [confirming, setConfirming] = useState<{
    type: "deactivate" | "activate" | "delete";
    user: User;
  } | null>(null);
  
  const { showSuccess, showError } = useToast();

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
            <>
              {Array.from({ length: skeletonRows }).map((_, index) => (
                <UserTableSkeletonRow key={index} />
              ))}
            </>
          ) : users.length === 0 ? (
            // Show empty state when no users
            <EmptyState />
          ) : (
            // Show actual data when loaded
            users.map((user) => {
              // Convert UserProfile to User format for compatibility
              const userForEdit: User = {
                id: user.id, // Use UUID string directly, don't parse as int
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role as CreatableUserRole,
                status: user.status,
              };

              return (
                <tr key={user.id} className="border-t">
                  <td className="px-0 py-1">
                    <div className="flex items-center justify-start">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className={`w-8 h-8 rounded-full ${getUserInitialsColor(user.firstName, user.lastName)} flex items-center justify-center text-white font-semibold text-xs`}>
                          {getUserInitials(user.firstName, user.lastName)}
                        </div>
                      )}
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
                      <span className={user.status === "active" ? "text-green-600" : "text-red-600"}>
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-1">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={async () => {
                          // Open modal immediately with existing data for instant feedback
                          setEditingUser(userForEdit);
                          
                          try {
                            const fetchedUser = await getUserById(user.id);
                            
                            const updatedUserForEdit = {
                              id: user.id, // Use UUID string directly
                              firstName: fetchedUser.firstName,
                              lastName: fetchedUser.lastName,
                              email: fetchedUser.email,
                              role: fetchedUser.role as CreatableUserRole,
                              status: fetchedUser.status,
                              avatar: fetchedUser.avatar || undefined, // Convert null to undefined
                            };
                            
                            setEditingUser(updatedUserForEdit);
                          } catch (error) {
                            console.error('Failed to fetch user data:', error);
                            // Keep existing data if fetch fails
                          }
                        }}
                        className="flex items-center gap-1 bg-gray-300 rounded px-2 py-1 text-xs cursor-pointer"
                      >
                        Edit <img src={Pen} className="h-3" alt="edit" />
                      </button>
                      
                      {/* Show Activate/Deactivate button based on status */}
                      {user.status === 'active' ? (
                        <button
                          onClick={() => setConfirming({ type: "deactivate", user: userForEdit })}
                          className="flex items-center gap-1 bg-red-100 rounded px-2 py-1 text-xs cursor-pointer"
                        >
                          Deactivate <img src={Scissors} className="h-3" alt="deactivate" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setConfirming({ type: "activate", user: userForEdit })}
                          className="flex items-center gap-1 bg-green-100 rounded px-2 py-1 text-xs cursor-pointer"
                        >
                          Activate <img src={GreenDot} className="h-3" alt="activate" />
                        </button>
                      )}
                      
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
          onConfirm={async () => {
            let success = false;
            let message = "";
            try {
              console.log('Confirming action for user:', confirming.user);
              console.log('User ID being used:', confirming.user.id, 'Type:', typeof confirming.user.id);
              
              if (confirming.type === "deactivate") {
                await onDeactivateUser(confirming.user.id);
                message = "User deactivated successfully!";
              } else if (confirming.type === "activate") {
                await onActivateUser(confirming.user.id);
                message = "User activated successfully!";
              } else {
                await onDeleteUser(confirming.user.id);
                message = "User deleted successfully!";
              }
              success = true;
            } catch (error) {
              console.error('Failed to perform action:', error);
              message = "Failed to perform action.";
            } finally {
              setConfirming(null);
              if (success) {
                showSuccess(message);
              } else {
                showError(message);
              }
            }
          }}
          onClose={() => setConfirming(null)}
        />
      )}
    </div>
  );
};

export default UserTable;