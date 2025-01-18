import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDishDetails } from "../services/api";
import { calculateCalories } from "../utils/calorieCalculator";
import QRGenerator from "./QRGenerator";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DishDetail = () => {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await getDishDetails(id);
        setDish(data.data);
        const initialQuantities = {};
        data.data.ingredients.forEach((_, idx) => (initialQuantities[idx] = 1));
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Failed to fetch dish details:", error);
      }
    };
    fetchDetails();
  }, [id]);

  const handleQuantityChange = (index, change) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: Math.max(1, (prev[index] || 1) + change),
    }));
  };

  const getHealthTip = (calories) => {
    if (calories < 300) return "This dish is low in calories. Great for weight loss!";
    if (calories < 600) return "Moderate calorie dish. Ideal for a balanced meal.";
    return "High-calorie dish. Consider reducing portion size for a lighter meal.";
  };

  const totalCalories = dish ? calculateCalories(dish.ingredients, quantities) : 0;

  if (!dish) return <div className="text-center text-gray-500 mt-10">Loading...</div>;

  const chartData = {
    labels: dish.ingredients.map((ingredient) => ingredient.name),
    datasets: [
      {
        data: dish.ingredients.map(
          (ingredient, idx) => ingredient.calories * quantities[idx]
        ),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="p-6">
      <div className="bg-gray-900 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          {dish.dishname}
        </h1>
        {dish.ingredients.map((ingredient, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center mt-4 text-gray-300"
          >
            <span className="text-lg">
              {ingredient.name} - {ingredient.calories} cal
            </span>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleQuantityChange(idx, -1)}
                className="bg-gray-700 px-3 py-1 rounded shadow hover:bg-gray-600 transition"
              >
                -
              </button>
              <span className="text-white">{quantities[idx] || 1}</span>
              <button
                onClick={() => handleQuantityChange(idx, 1)}
                className="bg-gray-700 px-3 py-1 rounded shadow hover:bg-gray-600 transition"
              >
                +
              </button>
            </div>
          </div>
        ))}
        <h2 className="text-xl font-semibold text-gray-200 mt-6">
          Total Calories: {totalCalories} cal
        </h2>
        <p className="text-sm text-gray-400">{getHealthTip(totalCalories)}</p>

        <div
          className="mt-6 flex justify-center"
          style={{ height: "300px", width: "300px" }}
        >
          <Doughnut data={chartData} options={chartOptions} />
        </div>

        <button
          onClick={() => setShowQR(true)}
          className="w-full mt-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition shadow"
        >
          Generate QR
        </button>
        {showQR && (
          <QRGenerator
            dish={dish}
            quantities={quantities}
            totalCalories={totalCalories}
          />
        )}
      </div>
    </div>
  );
};

export default DishDetail;
