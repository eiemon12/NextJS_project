"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AllBuses() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get('http://localhost:4000/customerSupport/getAllBuses');
        setBuses(response.data);
      } catch (error) {
        console.error('Error fetching buses:', error);
      }
    };

    fetchBuses();
  }, []);

  return (
    <div className="col-span-3 p-4">
      <h1 className="text-2xl font-bold mb-4">All Buses</h1>
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
          {buses.map((bus) => (
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
};


