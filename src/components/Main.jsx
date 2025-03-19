import React, { useState } from 'react';
import SearchForm from './SearchForm';
import LandingPage from './LandingPage';
import { CardResult } from './Card';
import useSearchHotels from '../hooks/useSearchHotels';

const Main = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchParams, setSearchParams] = useState(null);

  const {
    data: hotels = [],
    isLoading,
    error
  } = useSearchHotels(searchParams);

  const handleSearch = (params) => {
    console.log("Main received search params:", params);
    setSearchParams(params);
  };

  const handleStartSearch = () => {
    setShowSearch(true);
    window.scrollTo(0, 0);
  };

  return (
    <main className="flex-grow">
      {showSearch ? (
        <>
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 py-24 px-4"></div>
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />

          <div className="container mx-auto px-4 py-8">
            <CardResult
              hotels={hotels}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </>
      ) : (
        <LandingPage onStartSearch={handleStartSearch} />
      )}
    </main>
  );
};

export default Main;