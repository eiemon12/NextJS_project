"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';

interface BusEntity {
  id: number;
  operatorName: string;
  coachNumber: string | number;
  coachType: string;
  totalSit: number;
  route: string;
  time: string;
}

export default function AllBuses() {
  const [buses, setBuses] = useState<BusEntity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBuses, setFilteredBuses] = useState<BusEntity[]>([]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get('http://localhost:4000/customerSupport/getAllBuses');
        setBuses(response.data);
        setFilteredBuses(response.data); // Initialize filteredBuses with all buses
      } catch (error) {
        console.error('Error fetching buses:', error);
      }
    };

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
            <th className="border border-gray-500 px-4 py-2">Operator Name</th>
            <th className="border border-gray-500 px-4 py-2">Coach Number</th>
            <th className="border border-gray-500 px-4 py-2">Coach Type</th>
            <th className="border border-gray-500 px-4 py-2">Total Seats</th>
            <th className="border border-gray-500 px-4 py-2">Route</th>
            <th className="border border-gray-500 px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredBuses.map((bus) => (
            <tr key={bus.id}>
              <td className="border border-gray-500 px-4 py-2">{bus.operatorName}</td>
              <td className="border border-gray-500 px-4 py-2">{bus.coachNumber}</td>
              <td className="border border-gray-500 px-4 py-2">{bus.coachType}</td>
              <td className="border border-gray-500 px-4 py-2">{bus.totalSit}</td>
              <td className="border border-gray-500 px-4 py-2">{bus.route}</td>
              <td className="border border-gray-500 px-4 py-2">{bus.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
