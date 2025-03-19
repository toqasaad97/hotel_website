const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = 'https://api.makcorps.com';
const USE_PROXY = true; // Set to true to use the proxy to avoid CORS issues

// Helper function to handle fetch with CORS headers
const fetchWithCORS = async (url, options = {}) => {
  // Use proxy URL if USE_PROXY is true
  const proxyUrl = USE_PROXY ? url.replace(API_BASE_URL, '/api') : url;

  const defaultOptions = {
    headers: {
      'api_key': API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    mode: 'cors',  // Explicitly set CORS mode
  };

  try {
    console.log('Fetching URL:', USE_PROXY ? 'Using proxy' : 'Direct', proxyUrl);
    const response = await fetch(proxyUrl, { ...defaultOptions, ...options });
    return response;
  } catch (error) {
    console.error("Network error:", error);
    if (error.message.includes('CORS')) {
      throw new Error('CORS error: Unable to access the API. Please check if CORS is enabled on the server.');
    }
    throw error;
  }
};

export const searchCities = async (city) => {
  if (!city || city.length < 2) return [];

  try {
    const encodedCity = encodeURIComponent(city);
    console.log(`Searching for city: ${city}, encoded as: ${encodedCity}`);

    const url = `${API_BASE_URL}/mapping?api_key=${API_KEY}&name=${encodedCity}`;
    console.log('API URL:', url);

    const response = await fetchWithCORS(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`City search failed with status: ${response.status}, response: ${errorText}`);

      // Handle different types of errors
      if (response.status === 0 || response.status === 403) {
        console.error('CORS issue detected');
        return [{ id: 'DEMO1', name: 'New York', country: 'US' },
        { id: 'DEMO2', name: 'Paris', country: 'France' },
        { id: 'DEMO3', name: 'London', country: 'UK' },
        { id: 'DEMO4', name: 'Tokyo', country: 'Japan' },
        { id: 'DEMO5', name: 'Rome', country: 'Italy' }];
      }

      return [];
    }

    const data = await response.json();
    const mappedCities = data.map((city) => ({
      id: city.document_id,
      name: city.document_name || city.name || city.city || 'Unknown City',
      country: city.country || city.country_name || ''
    }));

    return mappedCities;
  } catch (error) {
    console.error("Error fetching cities:", error);

    // Return demo data if there's a CORS error
    if (error.message.includes('CORS')) {
      console.log('Returning demo city data due to CORS issue');
      return [{ id: 'DEMO1', name: 'New York', country: 'US' },
      { id: 'DEMO2', name: 'Paris', country: 'France' },
      { id: 'DEMO3', name: 'London', country: 'UK' },
      { id: 'DEMO4', name: 'Tokyo', country: 'Japan' },
      { id: 'DEMO5', name: 'Rome', country: 'Italy' }];
    }

    return [];
  }
};

export const searchHotels = async (searchParams) => {
  const { cityId, checkIn, checkOut, adults, children, rooms } = searchParams;
  try {
    // Validate dates before making API call
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      throw new Error('Your date has already passed: check-in date must be today or later');
    }

    if (checkOutDate <= checkInDate) {
      throw new Error('Check-out date must be after check-in date');
    }

    const url = `${API_BASE_URL}/city?api_key=${API_KEY}&cityid=${cityId}&checkin=${checkIn}&checkout=${checkOut}&pagination=1&cur=USD&rooms=${rooms || 1}&adults=${adults || 1}${children ? `&children=${children}` : ''}`;

    const response = await fetchWithCORS(url);
    console.log('Hotel API Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);

      // Parse the error response if possible
      let errorMessage;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || `API request failed with status ${response.status}`;

        // Handle the date validation error specifically
        if (errorMessage.includes('date has already passed')) {
          throw new Error('Your date has already passed: please select future dates');
        }
      } catch {
        // If error parsing fails, use the raw error text
        errorMessage = `API request failed with status ${response.status}: ${errorText}`;
      }

      // If CORS error, return demo data
      if (response.status === 0 || response.status === 403) {
        console.log('Returning demo hotel data due to CORS issue');
        return getDemoHotels(cityId);
      }

      throw new Error(errorMessage);
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

    // If CORS error, return demo data
    if (error.message.includes('CORS')) {
      console.log('Returning demo hotel data due to CORS error');
      return getDemoHotels(cityId);
    }

    throw error;
  }
};

// Function to generate demo hotel data when the API has CORS issues
function getDemoHotels(cityId) {
  const cityName = getCityNameById(cityId);

  return [
    {
      hotelId: `${cityId}-hotel1`,
      name: `${cityName} Grand Hotel`,
      telephone: '+1-555-123-4567',
      geocode: { lat: 40.7128, lng: -74.0060 },
      reviews: 4.7,
      price1: 199.99,
      vendor1: 'BookingDirect',
    },
    {
      hotelId: `${cityId}-hotel2`,
      name: `${cityName} Plaza Hotel`,
      telephone: '+1-555-234-5678',
      geocode: { lat: 40.7129, lng: -74.0061 },
      reviews: 4.5,
      price1: 149.99,
      vendor1: 'Hotels.com',
    },
    {
      hotelId: `${cityId}-hotel3`,
      name: `${cityName} Luxury Suites`,
      telephone: '+1-555-345-6789',
      geocode: { lat: 40.7130, lng: -74.0062 },
      reviews: 4.8,
      price1: 249.99,
      vendor1: 'Expedia',
    }
  ];
}

// Helper function to get a city name from an ID for demo data
function getCityNameById(cityId) {
  const demoNames = {
    'DEMO1': 'New York',
    'DEMO2': 'Paris',
    'DEMO3': 'London',
    'DEMO4': 'Tokyo',
    'DEMO5': 'Rome'
  };

  return demoNames[cityId] || 'Unknown City';
}
