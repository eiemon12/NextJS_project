"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string | number; // Allow phone to be either string or number
  gender: string;
  dateOfBirth: string;
}

export default function GetAllUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/customerSupport/getAllUsers');
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filteredUsers with all users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.toString().toLowerCase().includes(searchQuery.toLowerCase()) // Convert phone to string
      )
    );
  }, [searchQuery, users]);

  return (
    <div className="grid grid-cols-3">
      {/* Main content */}
      <div className="col-span-3 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">All Users</h1>
          <div>
            <input
              type="text"
              placeholder="Search users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr>
                <th className="border border-gray-500 px-4 py-2">ID</th>
                <th className="border border-gray-500 px-4 py-2">Name</th>
                <th className="border border-gray-500 px-4 py-2">Email</th>
                <th className="border border-gray-500 px-4 py-2">Phone</th>
                <th className="border border-gray-500 px-4 py-2">Gender</th>
                <th className="border border-gray-500 px-4 py-2">Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="border border-gray-500 px-4 py-2">{user.id}</td>
                  <td className="border border-gray-500 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-500 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-500 px-4 py-2">{user.phone}</td>
                  <td className="border border-gray-500 px-4 py-2">{user.gender}</td>
                  <td className="border border-gray-500 px-4 py-2">{user.dateOfBirth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
