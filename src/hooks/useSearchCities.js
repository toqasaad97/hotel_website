import { useQuery } from '@tanstack/react-query';
import { searchCities } from '../Services/api';
import { toast } from 'react-hot-toast';

const useSearchCities = (query) => {
  console.log('useSearchCities called with query:', query);

  return useQuery({
    queryKey: ['cities', query],
    queryFn: async () => {
      console.log('Query function executing for query:', query);
      if (!query || query.length < 2) return [];

      try {
        toast.loading('Searching cities...', { id: 'city-search' });

        const results = await searchCities(query);
        console.log('City search results:', results);

        if (!results || results.length === 0) {
          console.log('No cities found for query:', query);
          toast.error('No cities found matching your search', { id: 'city-search' });
          return [];
        }

        toast.success(`Found ${results.length} cities`, { id: 'city-search' });
        return results;
      } catch (error) {
        console.error('Error in useSearchCities hook:', error);

        let errorMessage = 'Error searching for cities';

        if (error.message) {
          if (error.message.includes('No cities found matching')) {
            errorMessage = error.message;
          } else if (error.message.includes('API returned HTML')) {
            errorMessage = 'Server returned invalid data format. Please try another search term.';
          } else if (error.message.includes('Request timed out')) {
            errorMessage = 'Search request timed out. Please try again.';
          } else if (error.message.includes('API returned invalid data format')) {
            errorMessage = 'Invalid data received from server. Please try a different search.';
          } else {
            // Use the first part of the error message, simplified
            errorMessage = error.message.split(':')[0];
          }
        }

        toast.error(errorMessage, { id: 'city-search' });
        return []; // Return empty array to prevent UI breakage
      }
    },
    enabled: query?.length >= 2,
    staleTime: 0,
    retry: 0, // Don't retry to avoid multiple error messages
    refetchOnWindowFocus: false,
  });
};

export default useSearchCities;