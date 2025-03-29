const { OpenAI } = require('openai');
require('dotenv').config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

//fomratting the prompt for the OpenAI API will be here

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