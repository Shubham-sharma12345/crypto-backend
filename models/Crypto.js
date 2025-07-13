const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  current_price: { type: Number, required: true },
  market_cap: { type: Number, required: true },
  price_change_percentage_24h: { type: Number, required: true },
  last_updated: { type: Date, required: true },

});

module.exports = mongoose.model('Crypto', cryptoSchema);