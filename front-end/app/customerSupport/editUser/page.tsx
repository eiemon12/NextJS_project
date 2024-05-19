"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string | number; // Allow phone to be either string or number
  gender: string;
  dateOfBirth: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>('http://localhost:4000/customerSupport/getAllUsers');
      setUsers(response.data);
      setFilteredUsers(response.data); // Initialize filteredUsers with all users
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/customerSupport/editUser/userEdit/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/customerSupport/deleteUser/${id}`);
      // Remove deleted user from state
      setUsers(users.filter(user => user.id !== id));
      setFilteredUsers(filteredUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
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
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="border border-gray-500 px-4 py-2">Id</th>
            <th className="border border-gray-500 px-4 py-2">Name</th>
            <th className="border border-gray-500 px-4 py-2">Email</th>
            <th className="border border-gray-500 px-4 py-2">Phone</th>
            <th className="border border-gray-500 px-4 py-2">Gender</th>
            <th className="border border-gray-500 px-4 py-2">Date Of Birth</th>
            <th className="border border-gray-500 px-4 py-2">Actions</th>
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
              <td className="border border-gray-500 px-4 py-2">
                <button 
                    onClick={() => handleEdit(user.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2">
                    Edit
                </button>
                <button 
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                    Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
