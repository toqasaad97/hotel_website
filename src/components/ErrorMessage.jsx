import React from 'react';
import warningIcon from '../assets/images/warning-icon.png';

const ErrorMessage = ({ message }) => {
  return (
    <div className="p-4 bg-red-50 rounded-lg text-red-700 text-center max-w-2xl mx-auto my-6">
      <div className="flex items-center justify-center">
        <img
          src={warningIcon}
          alt="Warning"
          className="h-6 w-6 mr-2"
        />
        <h3 className="text-lg font-semibold">Error</h3>
      </div>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default ErrorMessage;