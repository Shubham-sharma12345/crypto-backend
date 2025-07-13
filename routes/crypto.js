const express = require('express');
const router = express.Router();
const Crypto = require('../models/Crypto');
const HistoricalData = require('../models/HistoricalData');

// Get current crypto data
router.get('/current', async (req, res) => {
  try {
    const cryptos = await Crypto.find();
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching current data' });
  }
});

// Get historical data for a specific crypto
router.get('/historical/:id', async (req, res) => {
  try {
    const historicalData = await HistoricalData.find({ crypto_id: req.params.id }).sort({ timestamp: -1 });
    res.json(historicalData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching historical data' });
  }
});

module.exports = router;