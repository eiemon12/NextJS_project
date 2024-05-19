"use client"
import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';


interface FormData{
    operatorName: string,
    coachNumber: number,
    coachType: string,
    totalSit: number,
    route: string,
    time: string, 
}
export default function CreateBusInfo() {
  const router = useRouter();
  
  const [formData, setFormData] = useState<FormData>({
    operatorName: "",
    coachNumber: 0,
    coachType: "",
    totalSit: 0,
    route: "",
    time: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
        try {
            const response = await axios.post('http://localhost:4000/customerSupport/createBusInfo', formData);
            toast.success('Bus information added successfully!');
            router.push('/customerSupport/getAllBuses');
        } catch (error) {
            console.error('Error adding bus information:', error);
            toast.error('Failed to add bus information. Please try again.');
        }
    } else {
        setErrors(validationErrors);
    }
};



    const validateForm = (formData: FormData): Partial<FormData> => {
        const errors: Partial<FormData> = {};
    
        if (!formData.operatorName) {
            errors.operatorName = 'Operator name is required';
        }
        if (!formData.coachNumber) {
            errors.coachNumber = 'Coach number is required';
        }
        if (!formData.coachType) {
            errors.coachType = 'Coach type is required';
        }
        if (!formData.totalSit) {
            errors.totalSit = 'Total seats is required';
        }
        if (!formData.route) {
            errors.route = 'Route is required';
        }
        if (!formData.time) {
            errors.time = 'Time is required';
        }

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
        <h1 className="text-2xl font-bold mb-4">Add Bus Information</h1>
        {/* Operator Name */}
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
        
        {/* Coach Number */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coachNumber">
            Coach Number
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.coachNumber && 'border-red-500'}`}
            id="coachNumber"
            name="coachNumber"
            type="number"
            placeholder="Enter coach number"
            value={formData.coachNumber}
            onChange={handleInputChange}
          />
          {errors.coachNumber && <p className="text-red-500 text-xs italic">{errors.coachNumber}</p>}
        </div>

        {/* Coach Type */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coachType">
            Coach Type
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.coachType && 'border-red-500'}`}
            id="coachType"
            name="coachType"
            type="text"
            placeholder="Enter coach type"
            value={formData.coachType}
            onChange={handleInputChange}
          />
          {errors.coachType && <p className="text-red-500 text-xs italic">{errors.coachType}</p>}
        </div>

        {/* Total Seats */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalSeats">
            Total Seats
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.totalSit && 'border-red-500'}`}
            id="totalSit"
            name="totalSit"
            type="number"
            placeholder="Enter total seats"
            value={formData.totalSit}
            onChange={handleInputChange}
          />
          {errors.totalSit && <p className="text-red-500 text-xs italic">{errors.totalSit}</p>}
        </div>

        {/* Route */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="route">
            Route
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.route && 'border-red-500'}`}
            id="route"
            name="route"
            type="text"
            placeholder="Enter route"
            value={formData.route}
            onChange={handleInputChange}
          />
          {errors.route && <p className="text-red-500 text-xs italic">{errors.route}</p>}
        </div>

        {/* Time */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
            Time
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.time && 'border-red-500'}`}
            id="time"
            name="time"
            type="text"
            placeholder="Enter time"
            value={formData.time}
            onChange={handleInputChange}
          />
          {errors.time && <p className="text-red-500 text-xs italic">{errors.time}</p>}
        </div>
        
        {/* Submit button */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Bus Information
          </button>
        </div>
      </form>
    </div>
   
  );
}
