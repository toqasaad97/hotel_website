import React from 'react';
import hotelHero from '../assets/images/hotel-hero.jpg';
import buildingIcon from '../assets/images/building-icon.png';
import bedIcon from '../assets/images/bed-icon.png';
import locationIcon from '../assets/images/location-icon.png';

function LandingPage({ onStartSearch }) {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col">
      <div
        className="relative py-28 px-4 flex-grow flex items-center justify-center bg-cover bg-center"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${hotelHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Find Your <span className="text-blue-400">Perfect</span> Stay
            </h1>
            <p className="text-xl mb-10 text-gray-200 max-w-2xl mx-auto">
              Discover luxury accommodations worldwide at exclusive rates
            </p>

            <div className="grid grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
              <div className="flex flex-col items-center space-y-2 text-white">
                <div className="bg-blue-200 bg-opacity-70 p-3 rounded-full">
                  <img src={buildingIcon} alt="Building" className="w-6 h-6" />
                </div>
                <p className="text-sm">Premium Hotels</p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-white">
                <div className="bg-blue-200 bg-opacity-70 p-3 rounded-full">
                  <img src={bedIcon} alt="Bed" className="w-6 h-6" />
                </div>
                <p className="text-sm">Comfortable Rooms</p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-white">
                <div className="bg-blue-200 bg-opacity-70 p-3 rounded-full">
                  <img src={locationIcon} alt="Location" className="w-6 h-6" />
                </div>
                <p className="text-sm">Prime Locations</p>
              </div>
            </div>

            <button
              onClick={onStartSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Search Hotels Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;