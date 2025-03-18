import { useQuery } from '@tanstack/react-query';
import { searchCities } from '../Services/api';

export const useSearchCities = (query) => {
  return useQuery({
    queryKey: ['cities', query],
    queryFn: () => searchCities(query),
  });
};