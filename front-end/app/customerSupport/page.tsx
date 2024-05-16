
"use client"
import { useEffect, useState } from "react";
import axios from "axios";

export default function customerSupport() {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalBuses, setTotalBuses] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const usersResponse = await axios.get<number>('http://localhost:4000/customerSupport/totalUsers');
        const busesResponse = await axios.get<number>('http://localhost:4000/customerSupport/totalBuses');
        setTotalUsers(usersResponse.data);
        setTotalBuses(busesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);
    return (
      <>
        
          <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Customer Support Dashboard</h1>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-blue-200 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-3xl font-bold">{totalUsers}</p>
          </div>
          <div className="bg-green-200 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Total Buses</h2>
            <p className="text-3xl font-bold">{totalBuses}</p>
          </div>
        </div>
      </div>
        
      </>
    );
  }
  