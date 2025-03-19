# Hotel Search Website

A modern React application for searching and booking hotels. This web application allows users to search for hotels by city, check availability, and view detailed information about each hotel.

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
