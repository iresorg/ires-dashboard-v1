import React from "react";
import Plus from "@/shared/assets/icons/Frame 12.svg";
import Search from "@/shared/assets/icons/lineicons_search-2.svg";
import Filter from "@/shared/assets/icons/uiw_filter.svg";
import RedButton from "@shared/assets/icons/Ellipse 9.svg"
import Person from "@shared/assets/icons/Vector.svg";
import Email from "@shared/assets/icons/icon.svg";
import Role from "@shared/assets/icons/Shield.svg";
import GreenButton from "@shared/assets/icons/Ellipse 8.svg";
import Actions from "@shared/assets/icons/Group.svg";
import Pen from "@shared/assets/icons/pen.svg";
import Scissors from "@shared/assets/icons/scissors.svg";
import Delete from "@shared/assets/icons/delete.svg";
import LeftArrow from "@shared/assets/icons/Arrow left.svg";
import RightArrow from "@shared/assets/icons/Arrow right.svg";
import threebutton from "@/shared/assets/icons/svg.svg";

const UsersPage: React.FC = () => {
    const users = [
    { id: 1, name: "Lexis Colenial", email: "lexiscole@gmail.com", role: "Agent Admin", status: "Inactive", actions:"Edit"},
    { id: 2, name: "Robert Fox", email: "robert.fox@gmail.com", role: "Super Admin", status: "Active", actions:"Edit"},
    { id: 3, name: "Esther Howard", email: "mark@gmail.com", role: "Agent Admin", status: "Inactive", actions:"Edit" },
    { id: 4, name: "Jenny Wilson", email: "jenny.wilson@gmail.com", role: "Responder Admin", status: "Inactive", actions:"Edit" },
    { id: 5, name: "Jacob Jones", email: "ralph.edwards@gmail.com", role: "Responder Admin", status: "Active", actions:"Edit" },
    { id: 6, name: "Albert Flores", email: "albert.flores@gmail.com", role: "Agent Admin", status: "Inactive", actions:"Edit" },
    { id: 7, name: "Annette Black", email: "annette.black@gmail.com", role: "Agent Admin", status: "Active", actions:"Edit" },

  ];
  return (
    <div className="flex flex-col -mt-5">
      <div className="flex flex-row justify-between">
        <div>
          <div className="bg-[#0C0E5D] w-40 flex flex-col h-20 pt-2 rounded-sm items-center">
            <img src={Plus} className="h-10 pb-3"/>
            <p className="text-[#FFFFFF]" >Add New Admin</p>
          </div>
        </div>

        <div className="flex flex-row justify-between" >
          <div className="flex flex-row justify-between bg-[#D9D9D9] rounded-sm pr-6 pt-3 pl-7 h-12 w-55">
            <img src={Search} className="h-6 pr-0 mr-0"/>
            <p className="text-sm pt-0.5 pl-0 ml-0 opacity-50">Search <span className="pl-1">Name/Email</span></p>
          </div>
          <div className="flex flex-row justify-between bg-[#D9D9D9] ml-4 rounded-sm p-3 h-12 w-36">
            <img src={Filter} className="h-6 pr-0 mr-0"/>
            <p className="text-sm pt-0.5 pl-0 ml-0 opacity-50">Filter by Role</p>
          </div>

        </div>
      </div>

      <div className="mt-6 text-sm">
        <table className="min-w-full table-fixed border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-[200px] px-4 py-2 text-left">
                <div className="flex items-center">
                  <img src={Person} className="h-4 pr-2" alt="Icon" />
                  <span>Full Name</span>
                </div>
              </th>
              <th className="w-[250px] px-4 py-2 text-left">
                <div className="flex items-center space-x-2">
                  <img src={Email} className="h-4" alt="Icon" />
                  <span>Email</span>
                </div>
              </th>
              <th className="w-[150px] px-4 py-2 text-left">
                <div className="flex items-center space-x-2">
                  <img src={Role} className="h-4" alt="Icon" />
                  <span>Role</span>
                </div>
              </th>
              <th className="w-[150px] px-4 py-2 text-left">
                <div className="flex items-center space-x-2">
                  <img src={GreenButton} className="h-4" alt="Status" />
                  <span>Status</span>
                </div>
              </th>
              <th className="w-[200px] px-4 py-2 text-left">
                <div className="flex items-center space-x-2">
                  <img src={Actions} className="h-4 ml-15" alt="Actions" />
                  <span>Actions</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-[#D4CDCD]">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 flex items-center space-x-2 space-y-3">
                  {user.status === "Inactive" && (
                    <img src={RedButton} className="h-4 w-4 mt-3" alt="Inactive" />
                  )}
                  {user.status === "Active" && (
                    <img src={GreenButton} className="h-4 w-4 mt-3" alt="Active" />
                  )}
                  <span>{user.status}</span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 bg-[#D9D9D9] pl-2 pr-5 rounded-sm">
                      <span className="text-sm pl-0.5 pr-0.5">Edit</span>
                      <img src={Pen} className="h-3 w-3" alt="Edit" />
                    </button>
                    <button className="flex items-center bg-[#D00F24]/11 pl-2 pr-5 rounded-sm">
                      <span className="text-sm pl-0.5 pr-0.5">Deactivate</span>
                      <img src={Scissors} className="h-3 w-3" alt="Deactivate" />
                    </button>
                    <img src={Delete} className="h-4 w-4 cursor-pointer" alt="Delete" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row ml-70 mt-4">
          <img src={LeftArrow} className="h-4 w-4 ml-4 cursor-pointer opacity-50 mr-4 mt-0.5" alt="Previous Page" />
          <p className="opacity-50 mr-4 text-sm">Previous</p>
          <p className="mr-4 bg-[#0C0E5D] text-[#ffffff] pr-3 pl-3 rounded-sm">1</p>
          <p className="mr-4 pr-3 pl-3">2</p>
          <p className="mr-4 pr-3 pl-3">3</p>
          <img src={threebutton} className="h-4 w-4 cursor-pointer opacity-50 mr-4 mt-2" />
          <p className="opacity-50 text-sm">Next</p>
          <img src={RightArrow} className="h-4 w-4 cursor-pointer opacity-50 ml-4 mt-0.5" alt="Next Page"/>
      </div>
    </div>
  );
};

export default UsersPage;
