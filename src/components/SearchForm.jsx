import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Building, Calendar, User, Baby, Bed } from "lucide-react"; // Lucide icons

const SearchForm = () => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [roomType, setRoomType] = useState("single"); // State for room type

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      destination,
      checkIn,
      checkOut,
      adults,
      children,
      roomType,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl space-y-6 w-full max-w-4xl mx-auto border border-gray-200">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Find Your Perfect Stay
        </h1>

        {/* Destination */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
            <Building className="mr-2 text-blue-500" /> Destination
          </label>
          <div className="relative">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter a city"
              className="w-full pl-12 p-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm hover:border-blue-400 transition-all"
            />
            <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Check-in and Check-out */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <Calendar className="mr-2 text-purple-500" /> Check-in
            </label>
            <div className="relative">
              <DatePicker
                selected={checkIn}
                onChange={(date) => setCheckIn(date)}
                dateFormat="yyyy-MM-dd"
                className="w-full pl-12 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm hover:border-blue-400 transition-all"
                placeholderText="Select date"
              />
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <Calendar className="mr-2 text-purple-500" /> Check-out
            </label>
            <div className="relative">
              <DatePicker
                selected={checkOut}
                onChange={(date) => setCheckOut(date)}
                dateFormat="yyyy-MM-dd"
                className="w-full pl-12 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm hover:border-blue-400 transition-all"
                placeholderText="Select date"
              />
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Adults, Children */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <User className="mr-2 text-green-500" /> Adults
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                value={adults}
                onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                className="w-full pl-12 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm hover:border-blue-400 transition-all"
              />
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <Baby className="mr-2 text-yellow-500" /> Children
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                value={children}
                onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                className="w-full pl-12 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm hover:border-blue-400 transition-all"
              />
              <Baby className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Room Type Selector */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
            <Bed className="mr-2 text-red-500" /> Room Type
          </label>
          <div className="relative">
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full pl-12 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm hover:border-blue-400 transition-all appearance-none"
            >
              <option value="single">Single Room</option>
              <option value="double">Double Room</option>
              <option value="suite">Suite</option>
            </select>
            <Bed className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-md"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;