"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
}

export default function ViewProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }

    // Clear previous profile data when the component mounts
    setProfile(null);

    // Fetch profile data for the current user
    fetchProfileData(token);
  }, []);

  const fetchProfileData = async (token: string) => {
    try {
      const response = await axios.get('http://localhost:4000/customerSupport/viewProfile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      router.push('/signin');
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center full-screen pt-6 pb-6 bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">My Profile</h2>
        <div className="mb-6">
          <p className="text-lg text-gray-800 mb-2"><strong>ID:</strong> {profile.id}</p>
          <p className="text-lg text-gray-800 mb-2"><strong>Name:</strong> {profile.name}</p>
          <p className="text-lg text-gray-800 mb-2"><strong>Email:</strong> {profile.email}</p>
          <p className="text-lg text-gray-800 mb-2"><strong>Phone:</strong> {profile.phone}</p>
          <p className="text-lg text-gray-800 mb-2"><strong>Gender:</strong> {profile.gender}</p>
          <p className="text-lg text-gray-800"><strong>Date of Birth:</strong> {profile.dateOfBirth}</p>
        </div>
      </div>
    </div>
  );
}