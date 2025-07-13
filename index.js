const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const connectDB = require('./config/db');
const cryptoRoutes = require('./routes/crypto');
const fetchCryptoData = require('./services/fetchCryptoData');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/crypto', cryptoRoutes);

// Schedule cron job to fetch data every hour
cron.schedule('0 * * * *', () => {
  console.log('Fetching crypto data...');
  fetchCryptoData();
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Fetch data on server start
  fetchCryptoData();
});