import { useQuery } from '@tanstack/react-query';
import { searchHotels } from '../Services/api';
import { toast } from 'react-hot-toast';

const useSearchHotels = (searchParams) => {
  const { cityId, checkIn, checkOut } = searchParams || {};

  const enabled = Boolean(cityId && checkIn && checkOut);

  return useQuery({
    queryKey: ['hotels', cityId, checkIn, checkOut],
    queryFn: async () => {
      try {
        toast.loading('Searching for hotels...', { id: 'hotel-search' });

        const results = await searchHotels(searchParams);

        if (!results || results.length === 0) {
          toast.error('No hotels found for this search criteria', { id: 'hotel-search' });
          return [];
        }

        toast.success(`Found ${results.length} hotels!`, { id: 'hotel-search' });
        return results;
      } catch (error) {
        console.error('Hotel search error:', error);

        let errorMessage = 'Error searching for hotels';

        // Extract the relevant part of the error message
        if (error.message) {
          if (error.message.includes('No hotels found')) {
            errorMessage = error.message;
          } else if (error.message.includes('date')) {
            errorMessage = error.message;
          } else if (error.message.includes('API returned HTML')) {
            errorMessage = 'Server returned invalid data format. Please try another search.';
          } else if (error.message.includes('Request timed out')) {
            errorMessage = 'Search request timed out. Please try again.';
          } else if (error.message.includes('API returned invalid data format')) {
            errorMessage = 'Invalid data received from server. Please try a different search.';
          } else if (error.message.includes('City ID is required')) {
            errorMessage = 'Please select a valid city from the dropdown first';
          } else {
            // Use a simplified version of the error message
            errorMessage = error.message.split(':')[0];
          }
        }

        toast.error(errorMessage, { id: 'hotel-search' });
        return []; // Return empty array to avoid UI breakage
      }
    },
    enabled,
    staleTime: 0,
    retry: 0, // Don't retry API calls to avoid multiple error messages
    refetchOnWindowFocus: false,
  });
};

export default useSearchHotels;