"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 


export default function BusesPage() {
  const [buses, setBuses] = useState<busEntity[]>([]);
  const router = useRouter(); 

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await axios.get<busEntity[]>('http://localhost:4000/customerSupport/getAllBuses');
      setBuses(response.data);
    } catch (error) {
      console.error('Error fetching buses:', error);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/customerSupport/editBusInfo/busEdit/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/customerSupport/deleteBus/${id}`);
      // Remove deleted bus from state
      setBuses(buses.filter(bus => bus.id !== id));
    } catch (error) {
      console.error('Error deleting bus:', error);
    }
  };

  return (
 
    <div className="col-span-3 p-4">
      <h1 className="text-2xl font-bold mb-4">All Buses</h1>
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="border border-gray-500 px-4 py-2">Id</th>
            <th className="border border-gray-500 px-4 py-2">Operator Name</th>
            <th className="border border-gray-500 px-4 py-2">Coach Number</th>
            <th className="border border-gray-500 px-4 py-2">Coach Type</th>
            <th className="border border-gray-500 px-4 py-2">Total Seats</th>
            <th className="border border-gray-500 px-4 py-2">Route</th>
            <th className="border border-gray-500 px-4 py-2">Time</th>
            <th className="border border-gray-500 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus.id}>
              <td className="border border-gray-500 px-4 py-2">{bus.id}</td>
              <td className="border border-gray-500 px-4 py-2">{bus.operatorName}</td>
              <td className="border border-gray-500 px-4 py-2">{bus.coachNumber}</td>
              <td className="border border-gray-500 px-4 py-2">{bus.coachType}</td>
              <td className="border border-gray-500 px-4 py-2">{bus.totalSit}</td>
              <td className="border border-gray-500 px-4 py-2">{bus.route}</td>
              <td className="border border-gray-500 px-4 py-2">{bus.time}</td>
              <td className="border border-gray-500 px-4 py-2">
                <button 
                    onClick={() => handleEdit(bus.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Edit
                </button>
                <button 
                    onClick={() => handleDelete(bus.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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
