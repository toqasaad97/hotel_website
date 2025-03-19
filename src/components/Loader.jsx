import React from 'react';
import { ClipLoader, BeatLoader, PuffLoader } from 'react-spinners';

const Loader = ({ size = 60, type = 'clip' }) => {
  const getLoader = () => {
    switch (type) {
      case 'beat':
        return <BeatLoader color="#3B82F6" size={size/3} />;
      case 'puff':
        return <PuffLoader color="#3B82F6" size={size} />;
      default:
        return <ClipLoader color="#3B82F6" size={size} />;
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="text-center">
        {getLoader()}
        <p className="text-gray-600 mt-4">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;