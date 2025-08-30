// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001; // fixed port or change if needed

// CoinMarketCap API configuration
const CMC_API_KEY = 'e5e27344-c914-4d10-861b-ed8f6393eaf5'; // 🔑 hardcoded API key
const CMC_BASE_URL = 'https://pro-api.coinmarketcap.com/v1';

// Middleware
app.use(cors());
app.use(express.json());

// CoinMarketCap API headers
const cmcHeaders = {
  'X-CMC_PRO_API_KEY': CMC_API_KEY,
  'Accept': 'application/json'
};

// ===== Routes =====

// Get latest cryptocurrency listings
app.get('/api/cryptocurrency/listings/latest', async (req, res) => {
  try {
    const { start = 1, limit = 50, convert = 'USD' } = req.query;

    const response = await axios.get(`${CMC_BASE_URL}/cryptocurrency/listings/latest`, {
      headers: cmcHeaders,
      params: { start, limit, convert }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching cryptocurrency listings:', error.response?.data?.status?.error_message || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch cryptocurrency data',
      details: error.response?.data || error.message
    });
  }
});

// Get specific cryptocurrency quotes
app.get('/api/cryptocurrency/quotes/latest', async (req, res) => {
  try {
    const { symbol, id, convert = 'USD' } = req.query;

    const params = { convert };
    if (symbol) params.symbol = symbol;
    if (id) params.id = id;

    const response = await axios.get(`${CMC_BASE_URL}/cryptocurrency/quotes/latest`, {
      headers: cmcHeaders,
      params
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching cryptocurrency quotes:', error.response?.data?.status?.error_message || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch cryptocurrency quotes',
      details: error.response?.data || error.message
    });
  }
});

// Get cryptocurrency metadata
app.get('/api/cryptocurrency/info', async (req, res) => {
  try {
    const { symbol, id } = req.query;

    const params = {};
    if (symbol) params.symbol = symbol;
    if (id) params.id = id;

    const response = await axios.get(`${CMC_BASE_URL}/cryptocurrency/info`, {
      headers: cmcHeaders,
      params
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching cryptocurrency info:', error.response?.data?.status?.error_message || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch cryptocurrency info',
      details: error.response?.data || error.message
    });
  }
});

// Get global market metrics
app.get('/api/global-metrics/quotes/latest', async (req, res) => {
  try {
    const { convert = 'USD' } = req.query;

    const response = await axios.get(`${CMC_BASE_URL}/global-metrics/quotes/latest`, {
      headers: cmcHeaders,
      params: { convert }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching global metrics:', error.response?.data?.status?.error_message || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch global metrics',
      details: error.response?.data || error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CoinMarketCap Proxy Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});