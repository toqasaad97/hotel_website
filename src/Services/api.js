const API_KEY = '67d8b04258deec05aa89b663';
const API_BASE_URL = 'https://api.makcorps.com'
export const searchCities = async (city) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mapping?api_key=${API_KEY}&name=${city}`);
    const data = await response.json();
    return data.map((city) => ({
      id: city.cityid ,
      name: city.name ,
      country: city.country
    }));
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }

}

export const searchHotels = async (cityId, checkIn, checkOut, adults, children = 0, rooms = 1) => {
  if (!cityId) return [];

  try {
    const params = new URLSearchParams({
      api_key: API_KEY,
      cityid: cityId,
      checkin: checkIn,
      checkout: checkOut,
      pagination: 1,
      cur: 'USD',
      rooms,
      adults,
      children,
    });

    const response = await fetch(`${API_BASE_URL}/city?${params.toString()}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return [];
  }
};