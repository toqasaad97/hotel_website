const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = 'https://api.makcorps.com';

export const searchCities = async (city) => {
  if (!city || city.length < 2) return [];

  try {
    const encodedCity = encodeURIComponent(city);
    console.log(`Searching for city: ${city}, encoded as: ${encodedCity}`);

    const url = `${API_BASE_URL}/mapping?api_key=${API_KEY}&name=${encodedCity}`;
    console.log('API URL:', url);

    const response = await fetch(url, {
      headers: {
        'api_key': API_KEY
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`City search failed with status: ${response.status}, response: ${errorText}`);
      return [];
    }

    const data = await response.json();
    const mappedCities = data.map((city) => ({
      id: city.document_id,
    }));

    return mappedCities;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};

export const searchHotels = async (searchParams) => {
  const { cityId, checkIn, checkOut, adults, children, rooms } = searchParams;
  try {
    const url = `${API_BASE_URL}/city?api_key=${API_KEY}&cityid=${cityId}&checkin=${checkIn}&checkout=${checkOut}&pagination=1&cur=USD&rooms=${rooms || 1}&adults=${adults || 1}${children ? `&children=${children}` : ''}`;

    const response = await fetch(url, {
      headers: {
        'api_key': API_KEY
      }
    });
    console.log('Hotel API Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    if (data && data.error) {
      console.error('API returned error:', data.error);
      throw new Error(`API returned error: ${data.error}`);
    }

    const mappedHotels = data.map(hotel => ({
      hotelId: hotel.hotelId || hotel._id || `hotel-${Math.random().toString(36).substring(2, 10)}`,
      name: hotel.name || 'Unknown Hotel',
      telephone: hotel.telephone || '',
      geocode: hotel.geocode,
      reviews: hotel.reviews?.rating,
      price1: hotel.price1 || 0,
      vendor1: hotel.vendor1 || '',
    }));

    console.log('Mapped hotels:', mappedHotels);
    return mappedHotels;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};
