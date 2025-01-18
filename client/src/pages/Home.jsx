import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllDishes, deleteDish } from "../services/api";
import AddDish from "../components/AddDish";
import { toast } from "react-toastify"; // Import toast for notifications

const Home = () => {
  const [dishes, setDishes] = useState([]);
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [editDishData, setEditDishData] = useState(null); // Store data for editing a dish

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const { data } = await getAllDishes();
        setDishes(data.data);
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
      }
    };
    fetchDishes();
  }, []);

  const handleOpenModal = (dish = null) => {
    setEditDishData(dish); // If dish is provided, it's for editing, else it's for creating a new dish
    setShowAddDishModal(true);
  };

  const handleCloseModal = () => {
    setShowAddDishModal(false);
    setEditDishData(null); // Reset the edit data
  };

  const handleDeleteDish = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this dish?");
    if (confirmed) {
      try {
        await deleteDish(id);
        setDishes(dishes.filter(dish => dish._id !== id));
        toast.success("Dish deleted successfully!"); // Toast for successful deletion
      } catch (error) {
        toast.error("Failed to delete the dish.");
      }
    }
  };

  return (
    <div className="relative p-8 min-h-screen bg-gray-800">
      <div className={`${showAddDishModal ? "filter blur-md" : ""} transition-all duration-300`}>
        <h1 className="text-5xl font-extrabold text-center text-white-800 mb-10">
          Explore Delicious Dishes 🍴
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish) => (
            <div
              key={dish._id}
              className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl"
            >
              <Link
                to={`/dish/${dish._id}`}
                className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition"
              >
                {dish.dishname}
              </Link>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => handleOpenModal(dish)} // Edit existing dish
                  className="text-blue-600 hover:text-blue-800"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDeleteDish(dish._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Dish Modal */}
      {showAddDishModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-11/12 max-w-lg relative z-60">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
            >
              ✖
            </button>
            <AddDish dishData={editDishData} onClose={handleCloseModal} />
          </div>
        </div>
      )}

      {/* Add Dish Button */}
      <button
        onClick={() => handleOpenModal()} // Open modal to add a new dish
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-5 shadow-lg hover:bg-blue-700 text-3xl transition"
      >
        +
      </button>
    </div>
  );
};

export default Home;
