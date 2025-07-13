const axios = require('axios');
const Crypto = require('../models/Crypto');
const HistoricalData = require('../models/HistoricalData');

const fetchCryptoData = async () => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
    );
    const cryptos = response.data;

    // Save current data
    await Crypto.deleteMany({}); // Clear existing data
    const cryptoDocs = cryptos.map(crypto => ({
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
      current_price: crypto.current_price,
      market_cap: crypto.market_cap,
      price_change_percentage_24h: crypto.price_change_percentage_24h,
      last_updated: crypto.last_updated,
    }));
    await Crypto.insertMany(cryptoDocs);

    // Save historical data
    const historicalDocs = cryptos.map(crypto => ({
      crypto_id: crypto.id,
      name: crypto.name,
      price: crypto.current_price,
      market_cap: crypto.market_cap,
      price_change_percentage_24h: crypto.price_change_percentage_24h,
      timestamp: new Date(),
    }));
    await HistoricalData.insertMany(historicalDocs);

    console.log('Crypto data fetched and saved successfully');
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }
};

module.exports = fetchCryptoData;