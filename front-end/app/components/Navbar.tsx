"use client"
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-center">
        <div className="flex space-x-4">
          <ul className="flex space-x-4">
            <li>
              <Link href="/">
                <span className="text-white hover:text-blue-500 cursor-pointer font-medium">Home</span>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <span className="text-white hover:text-blue-500 cursor-pointer font-medium">About</span>
              </Link>
            </li>
            <li>
              <Link href="/signin">
                <span className="text-white hover:text-blue-500 cursor-pointer font-medium">Sign In</span>
              </Link>
            </li>
            <li>
              <Link href="/signup">
                <span className="text-white hover:text-blue-500 cursor-pointer font-medium">Sign Up</span>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <span className="text-white hover:text-blue-500 cursor-pointer font-medium">Contact</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
