const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const insightsRoutes = require('./routes/insights');

// Load env variables, I keep the Krabby Patty secret formula in .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(cors()); // Enable CORS for any frontend requests

// Routes bcs we be like that (;
app.use('/api', insightsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});