import axios from 'axios';
import dotenv from 'dotenv';
import https from 'https';

dotenv.config();

// Set up the HTTPS agent for handling requests
axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

// Function to handle retries
const fetchWithRetry = async (url, options, retries = 5, delay = 2000) => {
    try {
        const response = await axios(url, options);

        // Check for API errors and retry if model is too busy
        if (response.status !== 200) {
            if (response.data.error && response.data.error.message.includes("Model too busy")) {
                if (retries > 0) {
                    console.log(`Model busy, retrying... (${retries} retries left)`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    return await fetchWithRetry(url, options, retries - 1, delay);  // Retry
                } else {
                    throw new Error('Max retries reached. Please try again later.');
                }
            }
            throw new Error(`Gemini API returned status: ${response.status} - ${response.data?.error?.message || 'Unknown Error'}`);
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getDishSuggestions = async (req, res) => {
    const { preferences, calorieGoal } = req.body;

    if (!preferences || !calorieGoal) {
        return res.status(400).json({ message: "Please provide both preferences and calorie goal" });
    }

    const prompt = `Suggest 5 specific low-carb, vegetarian dishes that total around 500 calories each. The dishes should include:
    - Clear ingredient list
    - Approximate portion sizes
    - Step-by-step cooking instructions.

    The focus should be on healthy fats, low-carb vegetables, and protein-rich sources like tofu, eggs, and cheese. Avoid processed ingredients, and keep the calorie count around 500 for each dish.`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    if (!process.env.GEMINI_API_KEY) {
        console.error("GEMINI_API_KEY environment variable is not set.");
        return res.status(500).json({ message: "API key not configured." });
    }

    const requestBody = {
        contents: [{
            parts: [{
                text: prompt
            }]
        }]
    };

    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetchWithRetry(apiUrl, {
            method: 'POST',
            headers: headers,
            data: requestBody,
        });

        console.log("Gemini API Response:", JSON.stringify(response, null, 2));

        // Check if response contains candidates and extract content text from parts
        if (response && response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts && response.candidates[0].content.parts[0].text) {
            const suggestions = response.candidates[0].content.parts[0].text.trim();  // Access the first part's text

            // Split the response into an array of individual dishes
            const dishList = suggestions.split('\n').map(dish => {
                return {
                    text: dish.trim(),
                    // Add more properties if needed for better structure
                };
            }).filter(dish => dish.text !== '');  // Remove any empty dishes

            // Ensure the response is structured as an array of dishes
            return res.status(200).json({ suggestions: dishList });
        } else {
            console.error("Unexpected Gemini API response:", response);
            return res.status(500).json({ message: 'No suggestions generated by the AI or unexpected response format.' });
        }
    } catch (error) {
        console.error('Error with Gemini API request:', error);
        return res.status(500).json({ message: 'Error generating suggestions', error: error.message });
    }
};
