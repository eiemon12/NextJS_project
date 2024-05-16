"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function EditProfilePage() {
  const router = useRouter();
  const  token  = localStorage.getItem('Token');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: 0,
    password: '',
    gender: '',
    dateOfBirth: ''
  });

  const handleChange = (e: { target: {
      value: any; name: any;  
}; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    try {
      const response = await axios.patch('http://localhost:4000/customerSupport/editMyProfile', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Handle success response
      console.log('Profile updated successfully:', response.data);
      router.push('/customerSupport/viewMyProfile'); 
    } catch (error) {
      
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

        <label htmlFor="phone">Phone</label>
        <input type="number" id="phone" name="phone" value={formData.phone} onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />

        <label htmlFor="gender">Gender</label>
        <input type="text" id="gender" name="gender" value={formData.gender} onChange={handleChange} />

        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
