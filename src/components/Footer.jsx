import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} Hotel Finder App</p>
    </footer>
  );
};

export default Footer;