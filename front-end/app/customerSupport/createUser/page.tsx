
"use client"
import Link from "next/link";
import axios from "axios";
import { FormEvent, useState } from "react";
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
 
export default function SignUp() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setdateOfBirth] = useState("");
 
    const [errors, setErrors] = useState<Partial<{ name: string,email: string,  phone: string, password: string,  gender: string ,dateOfBirth:string}>>({});
 
    async function onSubmit(event: FormEvent) {
        event.preventDefault();
 
        const validationErrors = validateForm();
 
        if (Object.keys(validationErrors).length === 0) {
            const data = {
                name,
                password,
                email,
                phone,
                gender,
                dateOfBirth
            };
 
            try {
                const response = await axios.post('http://localhost:4000/customerSupport/creatUser', data);
                console.log(response);
                toast.success('Signup successful!');
                router.push('/signin');
            } catch (error) {
                console.error('Error during signup:', error);
                toast.error('Signup failed. Please try again.');
            }
        } else {
            setErrors(validationErrors);
        }
    }
 
    const validateForm = (): Partial<{ name: string, email: string, phone: string, password: string, gender: string,dateOfBirth:string }> => {
        const errors: Partial<{ name: string, email: string, phone: string, password: string,  gender: string,dateOfBirth:string }> = {};
 
        if (!name) {
            errors.name = 'Name is required';
        }
        
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Invalid email address';
        }
        
        if (!phone) {
            errors.phone = 'Phone number is required';
        }
        if (!password) {
            errors.password = 'Password is required';
        }
        if (!gender) {
            errors.gender = 'Gender is required';
        }
        if (!dateOfBirth) {
          errors.dateOfBirth = 'dateOfBirth is required';
      }
        return errors;
    };
 
return (
  <div className="flex flex-col justify-center items-center min-h-screen">
    <Toaster />
    <form className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
      <h1 className="text-2xl font-bold mb-4">Create New User</h1>
      {/* Name */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name && 'border-red-500'}`}
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
        />
        {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
      </div>
      
      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email && 'border-red-500'}`}
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
      </div>

      {/* Gender */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
          Gender
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.gender && 'border-red-500'}`}
          id="gender"
          type="text"
          placeholder="Enter your gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          name="gender"
        />
        {errors.gender && <p className="text-red-500 text-xs italic">{errors.gender}</p>}
      </div>

      {/* Phone Number */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
          Phone Number
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone && 'border-red-500'}`}
          id="phone"
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          name="phone"
        />
        {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password && 'border-red-500'}`}
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
      </div>

      {/* Date of Birth */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
          Date of Birth
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.dateOfBirth && 'border-red-500'}`}
          id="dob"
          type="date"
          placeholder="Enter your date of birth"
          value={dateOfBirth}
          onChange={(e) => setdateOfBirth(e.target.value)}
          name="dateOfBirth"
        />
        {errors.dateOfBirth && <p className="text-red-500 text-xs italic">{errors.dateOfBirth}</p>}
      </div>
      
      {/* Submit button */}
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign Up
        </button>
      </div>
    </form>
  </div>
);
}
