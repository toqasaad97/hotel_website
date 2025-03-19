const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = 'https://api.makcorps.com';
const USE_PROXY = true;
const FETCH_TIMEOUT = 15000; // 15 second timeout for all fetch operations

// Helper function to add a timeout to fetch operations
const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const { signal } = controller;

  // Create a timeout that will abort the fetch
  const timeout = setTimeout(() => {
    controller.abort();
  }, FETCH_TIMEOUT);

  try {
    const response = await fetch(url, { ...options, signal });
    clearTimeout(timeout);
    return response;
  } catch (error) {
    clearTimeout(timeout);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out - please try again');
    }
    throw error;
  }
};

const fetchWithCORS = async (url, options = {}) => {
  const proxyUrl = USE_PROXY ? url.replace(API_BASE_URL, '/api') : url;

  const defaultOptions = {
    headers: {
      'api_key': API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    mode: 'cors',
    credentials: 'omit',
  };

  try {
    console.log('Fetching URL:', proxyUrl);
    const response = await fetchWithTimeout(proxyUrl, { ...defaultOptions, ...options });
    return response;
  } catch (error) {
    console.error("Network error:", error);
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
    console.log('City API Response status:', response.status);

    // If the response is not OK, throw a descriptive error
    if (!response.ok) {
      const errorText = await response.text();
      const errorMsg = `City search failed (${response.status}): ${errorText.substring(0, 100)}`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    // Check content type to avoid parsing HTML as JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      const errorMsg = 'API returned HTML instead of JSON. Please check the city name.';
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    // Parse the JSON response
    const responseText = await response.text();

    try {
      const data = JSON.parse(responseText);

      // Return empty array if data is not what we expect
      if (!data || !Array.isArray(data)) {
        console.error('API returned invalid data format:', data);
        throw new Error('API returned invalid data format');
      }

      // Check if we have results
      if (data.length === 0) {
        console.log('No cities found for query:', city);
        throw new Error(`No cities found matching "${city}"`);
      }

      // Map cities with proper fields
      const mappedCities = data.map((city) => ({
        id: city.document_id,
        name: city.document_name || city.name || city.city || 'Unknown City',
        country: city.country || city.country_name || ''
      }));

      console.log('Found cities from API:', mappedCities);
      return mappedCities;
    } catch (parseError) {
      if (parseError.message.includes('No cities found')) {
        throw parseError; // Re-throw our formatted error
      }
      console.error('Error parsing JSON:', parseError, 'Raw response:', responseText.substring(0, 200));
      throw new Error('Failed to parse API response');
    }
  } catch (error) {
    console.error('Error in searchCities:', error);
    throw error; // Propagate error to be handled by the component
  }
};

export const searchHotels = async (searchParams) => {
  const { cityId, checkIn, checkOut, adults, children, rooms } = searchParams;

  try {
    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      throw new Error('Check-in date must be today or later');
    }

    if (checkOutDate <= checkInDate) {
      throw new Error('Check-out date must be after check-in date');
    }

    if (!cityId) {
      throw new Error('City ID is required');
    }

    // Build the URL using the city ID directly
    const url = `${API_BASE_URL}/city?api_key=${API_KEY}&cityid=${cityId}&checkin=${checkIn}&checkout=${checkOut}&pagination=1&cur=USD&rooms=${rooms || 1}&adults=${adults || 1}${children ? `&children=${children}` : ''}`;
    console.log(`Hotel search URL: ${url}`);

    const response = await fetchWithCORS(url);
    console.log('Hotel API Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      const errorMsg = `Hotel search failed (${response.status}): ${errorText.substring(0, 100)}`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    // Check content type
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      const errorMsg = 'API returned HTML instead of JSON. Please check the city ID.';
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    // Parse response
    const responseText = await response.text();

    try {
      const data = JSON.parse(responseText);

      if (!data || !Array.isArray(data)) {
        console.error('Invalid API response format', data);
        throw new Error('API returned invalid data format');
      }

      if (data.length === 0) {
        throw new Error(`No hotels found for the selected dates and location`);
      }

      // Map hotel data
      const mappedHotels = data.map(hotel => ({
        hotelId: hotel.hotelId || hotel._id || `hotel-${Math.random().toString(36).substring(2, 10)}`,
        name: hotel.name || 'Unknown Hotel',
        telephone: hotel.telephone || '',
        geocode: hotel.geocode,
        reviews: hotel.reviews?.rating,
        price1: hotel.price1 || 0,
        vendor1: hotel.vendor1 || '',
      }));

      console.log(`Found ${mappedHotels.length} hotels from API`);
      return mappedHotels;
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError, 'Raw response:', responseText.substring(0, 200));
      throw new Error('Failed to parse API response');
    }
  } catch (error) {
    console.error('Error in searchHotels:', error);
    throw error;
  }
};
