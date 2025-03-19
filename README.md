# Hotel Search Application

This application allows users to search for hotels based on location, dates, and room requirements. It integrates with the Makcorps API to fetch hotel data.

## Features

- Search for cities to find available hotels
- Select check-in and check-out dates
- Specify number of adults, children, and rooms
- Filter by room types (Single, Double, Twin, Family, Suite)
- View hotel search results with details like price, ratings, and contact information
- Responsive design for all device sizes

## Technology Stack

- React.js for UI components
- React Query for data fetching and caching
- Tailwind CSS for styling
- React Hot Toast for notifications
- React Datepicker for date selection
- Lucide React for icons

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd hotel-search-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Makcorps API key:
```
VITE_API_KEY=your_makcorps_api_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to: `http://localhost:5173` (or the port shown in your terminal)

## API Integration

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

## Deployment

The application is deployed at: [Demo URL](your-demo-url)

## Screenshots

(Add screenshots of your application here)

## Future Improvements

- Add more filtering options for hotel search results
- Implement pagination for large result sets
- Add a map view for hotel locations
- Add user authentication and saved searches
- Implement booking functionality

## License

MIT
