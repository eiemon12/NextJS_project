"use client"


import { useState, useEffect } from 'react';
import axios from 'axios';

export default function getAllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/customerSupport/getAllUsers');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="grid grid-cols-3">
    

    {/* Main content */}
    <div className="col-span-3 p-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
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
            {users.map((user) => (
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
};


