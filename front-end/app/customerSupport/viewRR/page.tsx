"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ViewRR = () => {
  const [rr, setRr] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRR, setFilteredRR] = useState([]);

  useEffect(() => {
    const fetchRR = async () => {
      try {
        const response = await axios.get('http://localhost:4000/customerSupport/viewRR');
        setRr(response.data);
        setFilteredRR(response.data);
      } catch (error) {
        console.error('Error fetching RR:', error);
      }
    };

    fetchRR();
  }, []);

  useEffect(() => {
    const filteredData = rr.filter((item) =>
      item.reviewerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.rating.toString().includes(searchTerm.toLowerCase())
    );
    setFilteredRR(filteredData);
  }, [searchTerm, rr]);

  return (
    <div className="col-span-3 p-4">
      <h1 className="text-2xl font-bold mb-4">All Review & Rating</h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search review"
          className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="border border-gray-500 px-4 py-2">Id</th>
            <th className="border border-gray-500 px-4 py-2">Reviewer Name</th>
            <th className="border border-gray-500 px-4 py-2">Review</th>
            <th className="border border-gray-500 px-4 py-2">Rating</th>
            <th className="border border-gray-500 px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredRR.map((rr) => (
            <tr key={rr.id}>
              <td className="border border-gray-500 px-4 py-2">{rr.id}</td>
              <td className="border border-gray-500 px-4 py-2">{rr.reviewerName}</td>
              <td className="border border-gray-500 px-4 py-2">{rr.content}</td>
              <td className="border border-gray-500 px-4 py-2">{rr.rating}</td>
              <td className="border border-gray-500 px-4 py-2">{rr.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewRR;