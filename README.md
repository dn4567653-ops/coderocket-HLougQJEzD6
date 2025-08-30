# Cryptocurrency Trading Platform

A comprehensive cryptocurrency trading platform with real-time data from CoinMarketCap API.

## Features

- **Real-time Data**: Live cryptocurrency prices and market data from CoinMarketCap
- **Top 50 Cryptocurrencies**: Display of the top cryptocurrencies by market cap
- **Trading Interface**: Professional trading interface similar to Binance
- **Portfolio Management**: Track your cryptocurrency investments
- **Responsive Design**: Optimized for desktop and mobile devices

## Setup Instructions

### 1. Frontend Setup

The frontend is already configured. Make sure you have the dependencies installed:

```bash
npm install
```

### 2. Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install backend dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The backend server will run on `http://localhost:3001`

### 3. Start the Frontend

In the main directory, start the frontend:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Integration

The platform uses the CoinMarketCap Professional API with the following endpoints:

- **Cryptocurrency Listings**: `/v1/cryptocurrency/listings/latest`
- **Cryptocurrency Quotes**: `/v1/cryptocurrency/quotes/latest`
- **Global Metrics**: `/v1/global-metrics/quotes/latest`
- **Cryptocurrency Info**: `/v1/cryptocurrency/info`

### API Key

The API key is configured in the backend server: `e5e27344-c914-4d10-861b-ed8f6393eaf5`

## Architecture

### Backend Proxy Server
- **Express.js** server that handles CoinMarketCap API requests
- **CORS enabled** for frontend communication
- **Error handling** with fallback data
- **Rate limiting** considerations for API calls

### Frontend
- **React 19** with TypeScript
- **Tailwind CSS 4** for styling
- **shadcn/ui** components
- **React Router** for navigation
- **Context API** for state management

## Environment Variables

For production deployment, set the following environment variables:

```env
NODE_ENV=production
PORT=3001
CMC_API_KEY=e5e27344-c914-4d10-861b-ed8f6393eaf5
```

## Deployment

### Backend Deployment
Deploy the backend server to your preferred platform (Heroku, Railway, etc.) and update the `API_BASE_URL` in the frontend context.

### Frontend Deployment
Build and deploy the frontend:
```bash
npm run build
```

## API Rate Limits

CoinMarketCap API has rate limits:
- **Basic Plan**: 333 calls/day
- **Hobbyist Plan**: 10,000 calls/month
- **Startup Plan**: 100,000 calls/month

The application refreshes data every 2 minutes to stay within rate limits.

## Features

### Dashboard
- Market overview with global metrics
- Top gainers and losers
- Sortable cryptocurrency table
- Real-time price updates

### Trading Interface
- Interactive price charts
- Order book display
- Buy/sell order forms
- Recent trades history

### Portfolio Management
- Portfolio performance tracking
- Asset allocation visualization
- Holdings management
- P&L calculations

## Support

For issues or questions, please check the CoinMarketCap API documentation:
https://coinmarketcap.com/api/documentation/v1/