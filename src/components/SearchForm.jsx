import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Building, Calendar, User, Baby, Bed, Search, AlertTriangle } from 'lucide-react';
import Loader from './Loader';
import { toast } from 'react-hot-toast';
import useSearchCities from '../hooks/useSearchCities';

function SearchForm({ onSearch, isLoading }) {

  const [citySearch, setCitySearch] = useState('');
  const [debouncedCitySearch, setDebouncedCitySearch] = useState('');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [roomType, setRoomType] = useState('single');
  const [cityId, setCityId] = useState('');
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [rooms, setRooms] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (citySearch.length >= 2) {
        setDebouncedCitySearch(citySearch);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [citySearch]);

  const { data: cities, isLoading: isSearchingCities, isError } = useSearchCities(debouncedCitySearch);

  function handleCitySelect(city) {
    console.log("Selected city:", city);
    setCityId(city.id);
    setCitySearch(`${city.name}${city.country ? `, ${city.country}` : ''} (ID: ${city.id})`);
    setShowSuggestions(false);
    setError(null);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!cityId) {
      setError('Please enter a valid city ID.');
      return;
    }

    if (!checkIn || !checkOut) {
      setError('Please select both check-in and check-out dates.');
      return;
    }

    if (checkIn >= checkOut) {
      setError('Check-out date must be after check-in date.');
      return;
    }

    const searchParams = {
      cityId: cityId,
      checkIn: checkIn.toISOString().split('T')[0],
      checkOut: checkOut.toISOString().split('T')[0],
      adults,
      children,
      rooms,
      roomType
    };

    console.log("Search params:", searchParams);

    try {
      onSearch(searchParams);
    } catch (error) {
      console.error('Error initiating hotel search:', error);

      if (error.message && error.message.includes('date has already passed')) {
        setError('Please select future dates for your stay.');
      } else {
        setError('Failed to start hotel search. Please try again later.');
      }

      toast.error('Failed to start hotel search', { id: 'hotel-search' });
    }
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minCheckoutDate = checkIn
    ? new Date(new Date(checkIn).setDate(checkIn.getDate() + 1))
    : new Date(new Date().setDate(today.getDate() + 1));

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg max-w-4xl mx-auto -mt-16 relative z-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Find Your Perfect Hotel
        </h2>

        {error && (
          <div className="text-red-500 text-sm text-center mb-4 flex items-center justify-center">
            <AlertTriangle size={16} className="mr-2" />
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            <Building className="inline mr-1" size={16} /> City Name or ID
          </label>
          <div className="relative">
            <input
              type="text"
              value={citySearch}
              onChange={(e) => {
                setCitySearch(e.target.value);
                setShowSuggestions(true);
                if (e.target.value.trim() !== citySearch.trim()) {
                  setCityId('');
                }
              }}
              onBlur={() => {
                setTimeout(() => setShowSuggestions(false), 200);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Enter city name or ID"
              className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {showSuggestions && citySearch.length >= 2 && (
              <div className="mt-1 bg-white border border-gray-200 rounded-lg shadow-md max-h-48 overflow-y-auto absolute w-full z-10">
                {isSearchingCities && (
                  <div className="p-3">
                    <Loader size={30} type="beat" />
                  </div>
                )}
                {isError && <p className="text-red-500 p-3 text-sm">Error fetching cities</p>}
                {cities && cities.length > 0 ? (
                  <ul>
                    {cities.map((city) => (
                      <li
                        key={city.id}
                        onClick={() => handleCitySelect(city)}
                        className="p-3 hover:bg-blue-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                      >
                        {city.name || 'Unknown'}{city.country ? `, ${city.country}` : ''} (ID: {city.id})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 p-3 text-sm">No cities found</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Calendar className="inline mr-1" size={16} /> Check-in
            </label>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={today}
              dateFormat="yyyy-MM-dd"
              className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholderText="Select date"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Calendar className="inline mr-1" size={16} /> Check-out
            </label>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={minCheckoutDate}
              dateFormat="yyyy-MM-dd"
              className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholderText="Select date"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Bed className="inline mr-1" size={16} /> Room Type
            </label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none bg-white"
            >
              <option value="single">Single Room</option>
              <option value="double">Double Room</option>
              <option value="twin">Twin Room</option>
              <option value="family">Family Room</option>
              <option value="suite">Suite</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <User className="inline mr-1" size={16} /> Rooms
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={rooms}
              onChange={(e) => setRooms(parseInt(e.target.value) || 1)}
              className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <User className="inline mr-1" size={16} /> Adults
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={adults}
              onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
              className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Baby className="inline mr-1" size={16} /> Children
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={children}
              onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
              className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!cityId || !checkIn || !checkOut || isLoading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium text-base hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader size={24} type="clip" />
              <span className="ml-2">Searching...</span>
            </span>
          ) : (
            <span className="flex items-center">
              <Search size={18} className="mr-2" />
              Search Hotels
            </span>
          )}
        </button>
      </form>
    </div>
  );
}

export default SearchForm;