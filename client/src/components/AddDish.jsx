import { useState, useEffect } from "react";
import { createDish, updateDish } from "../services/api";
import { toast } from "react-toastify";

const AddDish = ({ dishData, onClose }) => {
  const [dishName, setDishName] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", calories: 0 }]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (dishData) {
      setDishName(dishData.dishname);
      setIngredients(dishData.ingredients);
      setQuantity(dishData.quantity);
    }
  }, [dishData]);

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
      if (dishData) {
        // Update existing dish
        await updateDish(dishData._id, data);
        toast.success("Dish updated successfully!");
      } else {
        // Create new dish
        await createDish(data);
        toast.success("Dish added successfully!");
      }
      onClose(); 
    } catch (error) {
      toast.error("Error saving dish.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black p-4">
      <h1 className="text-2xl mb-4">{dishData ? "Edit Dish" : "Add a New Dish"}</h1>
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
        {dishData ? "Update Dish" : "Save Dish"}
      </button>
    </form>
  );
};

export default AddDish;
