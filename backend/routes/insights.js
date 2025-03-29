const express = require('express');
const router = express.Router();
const { validateInputData } = require('../middleware/validation');
const { getEnvironmentalInsights } = require('../services/openai');

// API endpoint for environmental insights
router.post('/environmental-insights', validateInputData, async (req, res) => {
  try {
    const insights = await getEnvironmentalInsights(req.body);
    res.json(insights);
  } catch (error) {
    console.error('Error generating environmental insights:', error);
    res.status(500).json({ 
      error: 'Failed to generate environmental insights', 
      details: error.message 
    });
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).send('Server is running');
});

module.exports = router;