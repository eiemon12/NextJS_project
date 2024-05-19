"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';

export default function Sidebar() {
  const router = useRouter();
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
  
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }

    axios.get('http://localhost:4000/customerSupport/viewProfile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      setUser(response.data);
    })
    .catch(error => {
      console.error('Error fetching profile:', error);
      router.push('/signin');
    });
  }, []);

  const toggleSubMenu = (index: number) => {
    setOpenSubMenu((prevIndex) => (prevIndex === index ? null : index));
  };

  const logout = async () => {
    try {
      const response = await axios.get('http://localhost:4000/customerSupport/logout');
      if (response.data.message === "You are logged out") {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        toast.success('Logout Successful');
        // Redirect to the home page after logout
        window.location.href = '/';
      } else {
        throw new Error('Logout failed: Unexpected response from server');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <div className="bg-gray-700 text-white h-full w-64 flex flex-col justify-between">
      <div className="p-4">
        <h1 className="text-lg font-semibold mb-4 text-blue-500">Logged in as: {user?.name}</h1>
        <h1 className="text-lg font-semibold mb-4">Menu</h1>
        <ul>
          <li className="mb-2">
            <div className="flex items-center justify-between">
              <Link href="/customerSupport">
                <div className="hover:text-blue-500 cursor-pointer">DashBoard</div>
              </Link>
            </div>
          </li>
          {/* My Profile */}
          <li className="mb-2">
            <div className="flex items-center justify-between" onClick={() => toggleSubMenu(0)}>
              <div className="hover:text-blue-500 cursor-pointer">My Profile</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${openSubMenu === 0 ? 'transform rotate-180' : ''}`}
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
                <li>
                  <Link href="/customerSupport/changePass">
                    <div className="hover:text-blue-500">Change Password</div>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
          {/* All Users */}
          <li className="mb-2">
            <div className="flex items-center justify-between" onClick={() => toggleSubMenu(1)}>
              <div className="hover:text-blue-500 cursor-pointer">User Info</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${openSubMenu === 1 ? 'transform rotate-180' : ''}`}
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
                  <Link href="/customerSupport/editUser">
                    <div className="hover:text-blue-500">Edit User</div>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
          {/* All Buses */}
          <li className="mb-2">
            <div className="flex items-center justify-between" onClick={() => toggleSubMenu(2)}>
              <div className="hover:text-blue-500 cursor-pointer">Bus Info</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${openSubMenu === 2 ? 'transform rotate-180' : ''}`}
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
          <li>
            <Link href="/customerSupport/viewRR">
              <div className="hover:text-blue-500">View Review & Rating</div>
            </Link>
          </li>
          <li>
            {/* Logout */}
            <div className="mb-2">
              <div onClick={logout} className="text-red-500 hover:text-red-700 cursor-pointer">
                Logout
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
