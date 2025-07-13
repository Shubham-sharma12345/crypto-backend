const mongoose = require('mongoose');

const historicalDataSchema = new mongoose.Schema({
  crypto_id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  market_cap: { type: Number, required: true },
  price_change_percentage_24h: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('HistoricalData', historicalDataSchema);