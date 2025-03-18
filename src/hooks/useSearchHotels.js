import { useQuery } from '@tanstack/react-query';
import { searchHotels } from '../Services/api';
export const useSearchHotels = (cityId, checkIn, checkOut, adults, children = 0, rooms = 1) => {
  return useQuery({
    queryKey: ['hotels', cityId, checkIn, checkOut, adults, children, rooms],
    queryFn: () => searchHotels(cityId, checkIn, checkOut, adults, children, rooms),
  });
};