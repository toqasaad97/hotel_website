import { useQuery } from '@tanstack/react-query';
import { searchCities } from '../Services/api';
import { toast } from 'react-hot-toast';

const useSearchCities = (query) => {
  console.log('useSearchCities called with query:', query);

  return useQuery({
    queryKey: ['cities', query],
    queryFn: async () => {
      console.log('Query function executing for query:', query);
      try {
        const results = await searchCities(query);
        console.log('City search results:', results);

        if (results.length === 0) {
          console.log('No cities found for query:', query);
        }

        return results;
      } catch (error) {
        console.log('Error in useSearchCities hook:', error);
        
        toast.error('Failed to fetch cities');
        return [];
      }
    },
    enabled: query?.length >= 2,
    staleTime: 0,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export default useSearchCities;