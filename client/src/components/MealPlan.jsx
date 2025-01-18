import { useState } from "react";
import { calculateCalories } from "../utils/calorieCalculator";

const MealPlan = ({ dishes }) => {
  const [goal, setGoal] = useState(2000);
  const [selectedDishes, setSelectedDishes] = useState([]);

  const handleSelectDish = (dish) => {
    setSelectedDishes((prev) => [...prev, dish]);
  };

  const totalCalories = selectedDishes.reduce(
    (sum, dish) => sum + calculateCalories(dish.ingredients, dish.quantities),
    0
  );

  return (
    <div className="p-6 bg-gray-900 rounded shadow-md text-white">
      <h2 className="text-3xl font-bold text-center">Meal Planner</h2>
      <div className="mt-4">
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value))}
          className="w-full bg-gray-800 rounded p-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Set your calorie goal"
        />
        <h3 className="text-lg mt-4 text-gray-300">
          Total Calories: {totalCalories} / {goal}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {dishes.map((dish) => (
          <button
            key={dish._id}
            onClick={() => handleSelectDish(dish)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 shadow transition"
          >
            Add {dish.dishname}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MealPlan;
import { useState } from "react";
import { calculateCalories } from "../utils/calorieCalculator"; // Ensure you have the correct calorie calculation logic

const MealPlan = ({ dishes }) => {
  const [goal, setGoal] = useState(2000);
  const [selectedDishes, setSelectedDishes] = useState([]);

  const handleSelectDish = (dish, quantity) => {
    setSelectedDishes((prev) => [
      ...prev,
      { dish, quantity }
    ]);
  };

  const totalCalories = selectedDishes.reduce((sum, { dish, quantity }) => {
    const dishCalories = calculateCalories(dish.ingredients, quantity);
    return sum + dishCalories;
  }, 0);

  return (
    <div className="p-6 bg-gray-900 rounded shadow-md text-white">
      <h2 className="text-3xl font-bold text-center">Meal Planner</h2>
      <div className="mt-4">
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value))}
          className="w-full bg-gray-800 rounded p-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Set your calorie goal"
        />
        <h3 className="text-lg mt-4 text-gray-300">
          Total Calories: {totalCalories} / {goal}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {dishes.map((dish) => (
          <div key={dish._id} className="bg-blue-600 text-white p-4 rounded shadow-lg">
            <h3 className="text-xl font-semibold">{dish.dishname}</h3>
            <div className="flex space-x-2 mt-2">
              <input
                type="number"
                min="1"
                defaultValue={1}
                className="w-20 p-2 bg-gray-800 rounded"
                onChange={(e) => handleSelectDish(dish, e.target.value)}
              />
              <button
                onClick={() => handleSelectDish(dish, 1)} // Default 1 quantity
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-500"
              >
                Add to Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlan;
