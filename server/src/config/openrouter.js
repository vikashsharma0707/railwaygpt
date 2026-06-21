const axios = require('axios');
const env = require('./env');

const openrouter = axios.create({
  baseURL: env.OPENROUTER_BASE_URL,
  headers: {
    Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': env.CLIENT_URL,
    'X-Title': 'RailwayGPT AI',
  },
  timeout: 120000,
});

module.exports = openrouter;
