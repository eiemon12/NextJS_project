"use client"
import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'; 

interface FormData {
  operatorName: string;
  coachNumber: number;
  coachType: string;
  totalSit: number;
  route: string;
  time: string;
}

export default function EditBusInfo() {
  const router = useRouter();
  const { id } = router.param; 

  const [formData, setFormData] = useState<FormData>({
    operatorName: "",
    coachNumber: 0,
    coachType: "",
    totalSit: 0,
    route: "",
    time: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    const fetchBusInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/customerSupport/getBusById/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching bus information:', error);
      }
    };

    if (id) {
      fetchBusInfo();
    }
  }, [id]); // Add id to the dependency array

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.put(`http://localhost:4000/customerSupport/updateBus/${id}`, formData);
        toast.success('Bus information updated successfully!');
        router.push('/customerSupport/getAllBuses');
      } catch (error) {
        console.error('Error updating bus information:', error);
        toast.error('Failed to update bus information. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (formData: FormData): Partial<FormData> => {
    const errors: Partial<FormData> = {};

    // Add validation logic here

    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <h1 className="text-2xl font-bold mb-4">Edit Bus Information</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="operatorName">
            Operator Name
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.operatorName && 'border-red-500'}`}
            id="operatorName"
            name="operatorName"
            type="text"
            placeholder="Enter operator name"
            value={formData.operatorName}
            onChange={handleInputChange}
          />
          {errors.operatorName && <p className="text-red-500 text-xs italic">{errors.operatorName}</p>}
        </div>
        {/* Add other input fields similarly */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Bus Information
          </button>
        </div>
      </form>
    </div>
  );
}
