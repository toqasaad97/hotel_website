import React from 'react';
import { Star, MapPin, Phone, Bed, DollarSign, Info } from 'lucide-react';
import toast from 'react-hot-toast';

const Card = ({ hotel }) => {
  const handleBookNow = () => {
    toast.dismiss('hotel-search');

    toast.success(`Booking request sent for ${hotel.name}!`, {
      duration: 3000,
      icon: '🏨',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });

    setTimeout(() => {
      toast('Booking confirmed! Check your email for details.', {
        icon: '✅',
        duration: 4000,
      });
    }, 1500);
  };

  const rating = hotel.reviews ?
    (typeof hotel.reviews === 'object' ? hotel.reviews.rating : hotel.reviews) : 0;

  const formattedRating = typeof rating === 'number' ? rating.toFixed(1) : rating;

  const price = hotel.price1 || 'N/A';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Hotel Image */}
      <div className="w-full h-48 overflow-hidden bg-blue-50">
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-50">
          <div className="text-3xl text-blue-500">🏨</div>
        </div>
      </div>

      {/* Hotel Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800 truncate">{hotel.name}</h3>
          {rating > 0 && (
            <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-medium text-gray-700 ml-1">
                {formattedRating}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-2 mb-4 text-sm text-gray-600">
          {hotel.room_type && (
            <div className="flex items-center">
              <Bed size={14} className="mr-1 text-blue-500" />
              <span className="capitalize">{hotel.room_type.replace('_', ' ')}</span>
            </div>
          )}

          {hotel.telephone && (
            <div className="flex items-center">
              <Phone size={14} className="mr-1 text-blue-500" />
              <span className="truncate">{hotel.telephone}</span>
            </div>
          )}

          {hotel.geocode && hotel.geocode.latitude && (
            <div className="flex items-center">
              <MapPin size={14} className="mr-1 text-blue-500" />
              <span className="text-xs">
                Lat: {hotel.geocode.latitude.toFixed(4)},
                Long: {hotel.geocode.longitude.toFixed(4)}
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="font-bold text-blue-600 flex items-center">
            {price !== 'N/A' ? (
              <>
                <DollarSign size={14} />
                {price}
                <span className="text-xs font-normal text-gray-500 ml-1">/night</span>
              </>
            ) : (
              <span className="text-gray-500 text-sm">Price not available</span>
            )}
          </div>
          <button
            onClick={handleBookNow}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-4 rounded-full text-sm transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export function CardResult({ hotels = [], isLoading, error }) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg text-red-700 text-center max-w-2xl mx-auto my-6">
        <Info size={24} className="mx-auto mb-2" />
        <h3 className="text-lg font-semibold mb-2">Error Loading Hotels</h3>
        <p className="text-sm">{error.message || 'Please try again later'}</p>
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    return (
      <div className="p-8 text-center max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Hotels Found</h3>
        <p className="text-gray-500 text-sm">Try searching with different criteria or another city</p>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Available Hotels ({hotels.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel, index) => (
          <Card key={hotel.hotelId || `hotel-${index}`} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Card;