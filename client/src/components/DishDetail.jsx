import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDishDetails } from '../services/api';
import { calculateCalories } from '../utils/calorieCalculator';
import QRGenerator from './QRGenerator';

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
        console.error('Failed to fetch dish details:', error);
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

  const totalCalories = dish ? calculateCalories(dish.ingredients, quantities) : 0;

  if (!dish) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center mb-6">{dish.dishname}</h1>
        {dish.ingredients.map((ingredient, idx) => (
          <div key={idx} className="flex justify-between items-center mt-4">
            <span className="text-lg">
              {ingredient.name} - {ingredient.calories} cal
            </span>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleQuantityChange(idx, -1)}
                className="bg-gray-600 px-3 py-1 rounded"
              >
                -
              </button>
              <span>{quantities[idx] || 1}</span>
              <button
                onClick={() => handleQuantityChange(idx, 1)}
                className="bg-gray-600 px-3 py-1 rounded"
              >
                +
              </button>
            </div>
          </div>
        ))}
        <h2 className="text-xl font-semibold text-gray-300 mt-6">
          Total Calories: {totalCalories} cal
        </h2>
        <button
          onClick={() => setShowQR(true)}
          className="w-full mt-4 py-2 bg-green-500 text-white rounded"
        >
          Generate QR
        </button>
        {showQR && <QRGenerator dish={dish} quantities={quantities} totalCalories={totalCalories} />}
      </div>
    </div>
  );
};

export default DishDetail;
