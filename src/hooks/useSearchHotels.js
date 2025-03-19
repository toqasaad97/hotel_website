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

        if (results.length === 0) {
          toast.error('No hotels found for this search criteria', { id: 'hotel-search' });
          return [];
        }

        toast.success(`Found ${results.length} hotels!`, { id: 'hotel-search' });
        return results;
      } catch (error) {
        let errorMessage = 'Failed to search hotels';

        // Check if the error is from the API
        if (error.message.includes('API request failed')) {
          // Extract the error message from the API
          const match = error.message.match(/API request failed with status \d+: (.+)/);
          if (match && match[1]) {
            try {
              // Try to parse the error JSON
              const jsonError = JSON.parse(match[1]);
              errorMessage = jsonError.message || errorMessage;
            } catch {
              // If not JSON, use the raw message
              errorMessage = match[1];
            }
          }
        }

        toast.error(errorMessage, { id: 'hotel-search' });
        console.error('Hotel search error:', error);
        throw new Error(errorMessage);
      }
    },
    enabled,
    staleTime: 0, // Don't cache results to ensure fresh data on each search
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export default useSearchHotels;