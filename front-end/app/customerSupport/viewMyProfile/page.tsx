"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/customerSupport/viewMyProfile');
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userProfile) {
    return <div>Error: Unable to fetch profile</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {userProfile.name}</p>
      <p>Email: {userProfile.email}</p>
      {/* Add more profile details as needed */}
    </div>
  );
}
