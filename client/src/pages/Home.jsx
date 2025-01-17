import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllDishes } from '../services/api';
import AddDish from '../components/AddDish';

const Home = () => {
  const [dishes, setDishes] = useState([]);
  const [showAddDishModal, setShowAddDishModal] = useState(false); 

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const { data } = await getAllDishes();
        setDishes(data.data);
      } catch (error) {
        console.error('Failed to fetch dishes:', error);
      }
    };
    fetchDishes();
  }, []);

  const handleOpenModal = () => {
    setShowAddDishModal(true);
  };

  const handleCloseModal = () => {
    setShowAddDishModal(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Dishes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dishes.map((dish) => (
          <div key={dish._id} className="bg-gray-800 p-6 rounded-lg shadow-md">
            <Link to={`/dish/${dish._id}`} className="text-white text-xl font-semibold">
              {dish.dishname}
            </Link>
          </div>
        ))}
      </div>

      {/* Add Dish Modal */}
      {showAddDishModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white rounded-lg p-6 w-11/12 max-w-md">
            <button
              onClick={handleCloseModal}
              className="text-white bg-red-600 rounded-full px-4 py-1 absolute top-4 right-4"
            >
              Close
            </button>
            <AddDish onClose={handleCloseModal} />
          </div>
        </div>
      )}

      {/* Add Dish Button */}
      <button
        onClick={handleOpenModal}
        className="fixed bottom-4 right-4 bg-green-600 text-white rounded-full p-4 shadow-lg text-2xl"
      >
        +
      </button>
    </div>
  );
};

export default Home;
