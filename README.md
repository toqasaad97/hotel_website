# Hotel Search Website

A modern React application for searching and booking hotels. This web application allows users to search for hotels by city, check availability, and view detailed information about each hotel.

[Live Demo](https://hotel-website-ecru.vercel.app/)

## Features

- Landing page with attractive hero image and key features
- Hotel search by city with autocomplete
- Date range selection for check-in and check-out
- Filters for adults, children, and room types
- Responsive design for all devices
- Real-time API integration with Makcorps

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/toqasaad97/hotel_website.git
   cd hotel_website
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to the local server (typically http://localhost:5173)

## Technologies Used

- React
- Vite
- React Query
- React Hot Toast
- React Datepicker
- Tailwind CSS
- Lucide React Icons

## API Integration

This project uses the Makcorps API for hotel data. API calls are handled through custom hooks:
- `useSearchCities` - For city search autocomplete
- `useSearchHotels` - For fetching hotel information based on search criteria

The application integrates with two main Makcorps API endpoints:

1. **City Search API** (`/mapping`): Used to search for cities and retrieve their IDs
2. **Hotel Search API** (`/city`): Used to search for hotels based on city ID and other parameters

### Finding the correct City ID

Before searching for hotels, the application must first find the correct City ID from the Makcorps API. This is implemented in the following way:

1. When a user types in the destination field, the application makes a request to the `/mapping` endpoint with the search query
2. The API returns a list of matching cities with their IDs
3. The user selects a city from the dropdown suggestions
4. When the user submits the search form, the application uses the selected city's ID to search for hotels

## Project Structure

- `src/components/`: UI components like SearchForm, Card, Header, etc.
- `src/Services/api.js`: API service for making requests to Makcorps API
- `src/hooks/`: Custom React hooks for data fetching
- `public/`: Static assets like images and icons

## Future Improvements

- Add more filtering options for hotel search results
- Implement pagination for large result sets
- Add a map view for hotel locations
- Add user authentication and saved searches
- Implement booking functionality

## License

MIT
