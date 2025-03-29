const { OpenAI } = require('openai');
require('dotenv').config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Format the prompt for OpenAI
const formatPrompt = (data) => {
  return `Based on the following daily lifestyle data, please provide four environmental insights:
1. Carbon Footprint (in kg CO₂)
2. Energy Intensity Score (on a scale from 0-10)
3. Ecological Impact Score (on a scale from 0-100)
4. Sustainability Tips (personalized recommendations for improvement)

Daily Lifestyle Data:
- Transportation:
  * Car distance: ${data.car_distance} km
  * Public transit distance: ${data.public_transit_distance} km
  * Biking/walking distance: ${data.biking_distance} km

- Energy Usage:
  * Lighting: ${data.lighting_hours} hours
  * Appliance usage: ${data.appliance_usage_hours} hours
  * Computer usage: ${data.computer_usage_hours} hours
  * Device charging: ${data.device_charging_hours} hours
  * Electric vehicle charging: ${data.electric_vehicle_charging_kwh} kWh
  * Renewable energy usage: ${data.renewable_energy_usage_kwh} kWh
  * Heating usage: ${data.heating_usage} kWh

- Diet:
  * Meat-based meals: ${data.meat_meals} per day
  * Plant-based meals: ${data.veg_meals} per day

- Resource Usage:
  * Waste generated: ${data.waste_generated} kg
  * Shower duration: ${data.shower_duration_minutes} minutes
  * Water-consuming appliance usage: ${data.appliance_usage_hours_water} hours
  * Other water usage: ${data.other_water_usage_hours} hours
  * Single-use items: ${data.single_use_items_used} items

Please provide your response in JSON format with the following structure:
{
  "carbon_footprint": {
    "value": (numeric value),
    "unit": "kg CO₂",
    "explanation": "(brief explanation of how this was calculated)"
  },
  "energy_intensity_score": {
    "value": (numeric value between 0-10),
    "explanation": "(brief explanation of this score)"
  },
  "ecological_impact_score": {
    "value": (numeric value between 0-100),
    "explanation": "(brief explanation of this score)"
  },
  "sustainability_tips": [
    "(specific actionable tip 1)",
    "(specific actionable tip 2)",
    "(specific actionable tip 3)",
    "(specific actionable tip 4)"
  ]
}`;
};

// Call OpenAI API and get environmental insights
const getEnvironmentalInsights = async (data) => {
  try {
    const prompt = formatPrompt(data);
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // Using a capable model for environmental analysis
      messages: [
        {
          role: "system",
          content: "You are an environmental impact assessment expert. Provide accurate, scientifically-based environmental insights based on daily lifestyle data. Format your response as valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    // Parse the response
    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};

module.exports = { getEnvironmentalInsights };