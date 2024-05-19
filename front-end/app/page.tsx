"use client"
import Link from "next/link";


export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold">Welcome to Ticketing System</h1>
      </header>
      <main>
        <section className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4">Find and Book Your Tickets</h2>
          <p className="text-lg mb-8">Discover events happening near you and book your tickets online.</p>
          <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-700">Explore Events</button>
        </section>
        <section className="py-12">
          <h2 className="text-2xl font-semibold text-center mb-8">Featured Events</h2>
          <div className="flex flex-wrap justify-center">
            <div className="max-w-xs rounded overflow-hidden shadow-lg mx-4 mb-8">
              <img className="w-full" src="https://via.placeholder.com/300x200" alt="Event" />
              <div className="px-6 py-4">
                <h3 className="font-semibold text-xl mb-2">Event Title</h3>
                <p className="text-gray-700 text-base">Event Description</p>
              </div>
              <div className="px-6 py-4">
                <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-700">View Details</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
    </div>
      
    </>
  );
}
