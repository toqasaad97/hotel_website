import React from 'react';
import { Star, MapPin, Phone } from 'lucide-react';

const staticHotels = [
  {
    geocode: { latitude: 40.7279 , longitude: -73.9908 },
    telephone: '+1 212-475-5700',
    name: 'The Standard, East Village',
    hotelId: 1149402,
    reviews: { rating: 4.5, count: 1533 },
    price1: null,
  },
];

export function CardResult() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {staticHotels.map((hotel) => (
        <div
          key={hotel.hotelId}
          className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
        >
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{hotel.name}</h3>
            <div className="flex items-center gap-2 text-gray-600 mb-3">
              <MapPin size={18} className="text-blue-500" />
              <span className="text-sm">
                {hotel.geocode.latitude.toFixed(2)}, {hotel.geocode.longitude.toFixed(2)}
              </span>
            </div>
            {/* tel */}
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <Phone size={18} className="text-purple-500" />
              <span className="text-sm">{hotel.telephone}</span>
            </div>
            {/* rev */}
              <div className="flex items-center gap-2 mb-4">
                <Star size={18} className="text-yellow-400" />
                <span className="font-medium text-gray-800">{hotel.reviews.rating}</span>
                <span className="text-gray-500 text-sm">({hotel.reviews.count} reviews)</span>
              </div>
              {/* price */}
              {hotel.price1 ? (
              <div className="mt-4">
                <span className="text-2xl font-bold text-blue-600">${hotel.price1}</span>
                <span className="text-gray-500 text-sm"> /night</span>
              </div>
            ) : (
              <div className="mt-4">
                <span className="text-gray-500 text-sm">Price not available</span>
              </div>
            )}
            <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-md">
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}