"use client"
import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleSubMenu = (index:any) => {
    setOpenSubMenu((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="bg-gray-700 text-white h-full w-64  flex-col justify-between">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Menu</h2>
        <ul>
          {/* My Profile */}
          <li className="mb-2">
            <div
              className="flex items-center justify-between"
              onClick={() => toggleSubMenu(0)}
            >
              <div className="hover:text-blue-500 cursor-pointer">My Profile</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${
                  openSubMenu === 0 ? 'transform rotate-180' : ''
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a.75.75 0 01-.53-.22L2.22 10.53a.75.75 0 011.06-1.06L10 16.94l6.72-6.72a.75.75 0 111.06 1.06l-7.25 7.25a.75.75 0 01-.53.22z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {openSubMenu === 0 && (
              <ul className="ml-4">
                <li>
                  <Link href="/customerSupport/viewMyProfile">
                    <div className="hover:text-blue-500">View Profile</div>
                  </Link>
                </li>
                <li>
                  <Link href="/customerSupport/editMyProfile">
                    <div className="hover:text-blue-500">Edit Profile</div>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
          {/* All Users */}
          <li className="mb-2">
            <div
              className="flex items-center justify-between"
              onClick={() => toggleSubMenu(1)}
            >
              <div className="hover:text-blue-500 cursor-pointer">User Info</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${
                  openSubMenu === 1 ? 'transform rotate-180' : ''
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a.75.75 0 01-.53-.22L2.22 10.53a.75.75 0 011.06-1.06L10 16.94l6.72-6.72a.75.75 0 111.06 1.06l-7.25 7.25a.75.75 0 01-.53.22z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {openSubMenu === 1 && (
              <ul className="ml-4">
                <li>
                  <Link href="/customerSupport/getAllUsers">
                    <div className="hover:text-blue-500">View All Users</div>
                  </Link>
                </li>
                <li>
                  <Link href="/customerSupport/createUser">
                    <div className="hover:text-blue-500">Add User</div>
                  </Link>
                </li>
                <li>
                  <Link href="/customerSupport/edituser">
                    <div className="hover:text-blue-500">Edit User</div>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
          {/* All Buses */}
          <li className="mb-2">
            <div
              className="flex items-center justify-between"
              onClick={() => toggleSubMenu(2)}
            >
              <div className="hover:text-blue-500 cursor-pointer">Bus Info</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${
                  openSubMenu === 2 ? 'transform rotate-180' : ''
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a.75.75 0 01-.53-.22L2.22 10.53a.75.75 0 011.06-1.06L10 16.94l6.72-6.72a.75.75 0 111.06 1.06l-7.25 7.25a.75.75 0 01-.53.22z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {openSubMenu === 2 && (
              <ul className="ml-4">
                <li>
                  <Link href="/customerSupport/getAllBuses">
                    <div className="hover:text-blue-500">View All Buses</div>
                  </Link>
                </li>
                <li>
                  <Link href="/customerSupport/createBusInfo">
                    <div className="hover:text-blue-500">Add Bus</div>
                  </Link>
                </li>
                <li>
                  <Link href="/customerSupport/editBusInfo">
                    <div className="hover:text-blue-500">Edit Bus</div>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      
      {/* Logout */}
      <div className="p-4">
        <Link href="/customerSupport/logout">
          <div className="text-red-500 hover:text-red-700 cursor-pointer">Logout</div>
        </Link>
      </div>
    </div>
  );
}


