# Hotel Search Website

This application allows users to search for hotels based on location, dates, and room requirements. It integrates with the Makcorps API to fetch hotel data.
[Live Demo](https://hotel-website-ecru.vercel.app/)

## Features

- Search for hotels by city
- Select dates and room preferences
- View hotel details and pricing

## Quick Start

1. Clone the repo
   ```
   git clone https://github.com/toqasaad97/hotel_website.git
   cd hotel_website
   ```

2. Install and run
   ```
   npm install
   npm run dev
   ```

3. Open http://localhost:5173 (or the port shown in terminal)

## Technologies

- React + Vite
- React Query
- Tailwind CSS
- Makcorps API

## Environment Setup

Create a `.env` file with your API key:
```
VITE_API_KEY=your_api_key
```

## CORS Handling

This application includes three strategies for handling CORS issues:

1. **Vite Proxy Server**: The development server proxies API requests to avoid CORS errors
2. **Fallback Demo Data**: If API calls fail due to CORS, the app will display demo data instead
3. **CORS Headers**: Proper headers are included with all API requests

To toggle between using the proxy and direct API calls, set the `USE_PROXY` flag in `src/Services/api.js`.

## License

MIT
