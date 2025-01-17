import { useState } from "react";
import { createDish } from "../services/api";

const AddDish = ({ onClose }) => {
  const [dishName, setDishName] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", calories: 0 }]);
  const [quantity, setQuantity] = useState(1);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", calories: 0 }]);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleChangeIngredient = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = field === "calories" ? Number(value) : value;
    setIngredients(newIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { dishname: dishName, ingredients, quantity };
      await createDish(data);
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error adding dish:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-2xl mb-4">Add a New Dish</h1>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Dish Name</label>
        <input
          type="text"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex space-x-4 mb-2">
            <input
              type="text"
              placeholder="Ingredient Name"
              value={ingredient.name}
              onChange={(e) =>
                handleChangeIngredient(index, "name", e.target.value)
              }
              className="flex-1 p-2 bg-gray-800 rounded"
              required
            />
            <input
              type="number"
              placeholder="Calories"
              value={ingredient.calories}
              onChange={(e) =>
                handleChangeIngredient(index, "calories", e.target.value)
              }
              className="w-24 p-2 bg-gray-800 rounded"
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveIngredient(index)}
              className="px-3 py-2 bg-red-600 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddIngredient}
          className="mt-2 bg-blue-600 px-3 py-2 rounded"
        >
          Add Ingredient
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full p-2 bg-gray-800 rounded"
          min="1"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-6 bg-green-600 px-4 py-2 rounded w-full"
      >
        Save Dish
      </button>
    </form>
  );
};

export default AddDish;
