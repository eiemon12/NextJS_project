"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function ChangePasswordForm() {
  const [formData, setFormData] = useState({ oldPassword: '', newPassword: '' });
  const router = useRouter();

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.patch('http://localhost:4000/customerSupport/changePassword', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Password changed successfully');
      router.push('/signin'); 
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Failed to change password. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-6 pb-6 bg-gray-100">
  <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-8">
    <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">Change Password</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oldPassword">
          Old Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="oldPassword"
          name="oldPassword"
          type="password"
          value={formData.oldPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
          New Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="newPassword"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Change Password
        </button>
      </div>
    </form>
  </div>
</div>

  );
}
