import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa"; // For loading spinner

const EagleAi = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");
    
    const userMessage = prompt.trim();
    if (!userMessage) return;  // Prevent sending empty messages

    // Add user's message to chat
    setMessages([...messages, { text: userMessage, isAI: false }]);
    setPrompt(""); // Clear input field

    try {
      const { data } = await axios.post("http://localhost:3000/api/dishes/suggest", {
        preferences: userMessage,
        calorieGoal: "500", 
      });

      // Handle AI's response (expecting an array of dish suggestions)
      const suggestions = data.suggestions || [];
      
      // Format the suggestions in a way that it will display properly
      setMessages([
        ...messages, 
        { text: userMessage, isAI: false },
        {
          text: suggestions.map(dish => `• ${dish.text}`).join('\n'),
          isAI: true
        }
      ]);
    } catch (error) {
      toast.error("Error fetching AI response.");
      console.error("Error with AI suggestion:", error);
      setMessages([
        ...messages, 
        { text: "Sorry, there was an error fetching dish suggestions.", isAI: true }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-8 min-h-screen bg-gray-900 text-white flex flex-col">
      <h1 className="text-5xl font-extrabold text-center mb-6">
        Get AI Dish Suggestions 🍽️
      </h1>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[80%] p-3 rounded-lg ${message.isAI ? "bg-blue-600 self-start" : "bg-gray-800 self-end"}`}
          >
            <p>{message.text}</p>
          </div>
        ))}

        {loading && (
          <div className="max-w-[80%] p-3 rounded-lg bg-blue-600 self-start flex items-center">
            <FaSpinner className="animate-spin mr-2" />
            <p>Thinking...</p>
          </div>
        )}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-4 mt-4">
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
          placeholder="E.g., vegetarian, low-carb, etc."
        />
        <button
          type="submit"
          className="bg-blue-600 p-3 rounded-lg text-white font-semibold disabled:bg-gray-500"
          disabled={loading || !prompt.trim()}
        >
          {loading ? <FaSpinner className="animate-spin" /> : "Send"}
        </button>
      </form>
    </div>
  );
};

export default EagleAi;
