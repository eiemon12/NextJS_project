"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 

interface busEntity {
  id: number;
  operatorName: string;
  coachNumber: string | number; // coachNumber could be string or number
  coachType: string;
  totalSit: number;
  route: string;
  time: string;
}

export default function BusesPage() {
  const [buses, setBuses] = useState<busEntity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBuses, setFilteredBuses] = useState<busEntity[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchBuses();
  }, []);

  useEffect(() => {
    setFilteredBuses(
      buses.filter(bus => 
        bus.operatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bus.coachNumber.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        bus.route.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, buses]);

  const fetchBuses = async () => {
    try {
      const response = await axios.get<busEntity[]>('http://localhost:4000/customerSupport/getAllBuses');
      setBuses(response.data);
      setFilteredBuses(response.data); // Initialize filteredBuses with all buses
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
      setFilteredBuses(filteredBuses.filter(bus => bus.id !== id)); // Remove from filteredBuses as well
    } catch (error) {
      console.error('Error deleting bus:', error);
    }
  };

  return (
    <div className="col-span-3 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Buses</h1>
        <div>
          <input
            type="text"
            placeholder="Search buses"
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
          {filteredBuses.map((bus) => (
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
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mb-1">
                    Edit
                </button>
                <button 
                    onClick={() => handleDelete(bus.id)}
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
