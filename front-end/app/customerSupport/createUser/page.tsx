"use client"


import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';


interface UserFormData {
  name: string;
  email: string;
  phone: number;
  password: string;
  gender: string;
  dateOfBirth: string;
}

export default function AddUser() {
  const router = useRouter();

  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: 0,
    password: '',
    gender: '',
    dateOfBirth: '',
  });

  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:4000/customerSupport/createUser', formData);
        toast.success('User created successfully!');
        router.push('/customerSupport/getAllUsers');
      } catch (error) {
        console.error('Error creating user:', error);
        toast.error('Failed to create user. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (formData: UserFormData): Partial<UserFormData> => {
    const errors: Partial<UserFormData> = {};

    if (!formData.name) {
      errors.name = 'Name is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    }
    if (!formData.phone) {
      errors.phone = 'Phone is required';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    if (!formData.gender) {
      errors.gender = 'Gender is required';
    }
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Date of Birth is required';
    }

    return errors;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  return (
   
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Toaster />
      <form className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Add User</h1>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name && 'border-red-500'}`}
            id="name"
            name="name"
            type="text"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email && 'border-red-500'}`}
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone && 'border-red-500'}`}
            id="phone"
            name="phone"
            type="number"
            placeholder="Enter phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password && 'border-red-500'}`}
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
            Gender
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.gender && 'border-red-500'}`}
            id="gender"
            name="gender"
            type="text"
            placeholder="Enter gender"
            value={formData.gender}
            onChange={handleInputChange}
          />
          {errors.gender && <p className="text-red-500 text-xs italic">{errors.gender}</p>}
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfBirth">
            Date of Birth
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.dateOfBirth && 'border-red-500'}`}
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            placeholder="Enter date of birth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-xs italic">{errors.dateOfBirth}</p>}
        </div>

        {/* Submit button */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            >
            Add User
          </button>
        </div>
      </form>
    </div>
    
  );
}

