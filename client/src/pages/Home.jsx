import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllDishes, deleteDish } from "../services/api";
import AddDish from "../components/AddDish";
import { toast } from "react-toastify"; 
const Home = () => {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]); // For search and pagination
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [editDishData, setEditDishData] = useState(null); // Store data for editing a dish
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [currentPage, setCurrentPage] = useState(1); // Pagination current page
  const itemsPerPage = 6; // Number of items per page

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const { data } = await getAllDishes();
        setDishes(data.data);
        setFilteredDishes(data.data); // Initialize filtered dishes
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
        toast.error("Failed to fetch dishes");
      }
    };
    fetchDishes();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = dishes.filter((dish) =>
      dish.dishname.toLowerCase().includes(query)
    );
    setFilteredDishes(filtered);
    setCurrentPage(1); // Reset to the first page when searching
  };

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
        const updatedDishes = dishes.filter((dish) => dish._id !== id);
        setDishes(updatedDishes);
        setFilteredDishes(updatedDishes);
        toast.success("Dish deleted successfully!"); // Toast for successful deletion
      } catch (error) {
        toast.error("Failed to delete the dish.");
      }
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredDishes.length / itemsPerPage);
  const paginatedDishes = filteredDishes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative p-8 min-h-screen bg-gray-800">
      <div className={`${showAddDishModal ? "filter blur-md" : ""} transition-all duration-300`}>
        <h1 className="text-5xl font-extrabold text-center text-white-800 mb-10">
          Add Dishes & Check Calories 🍴
        </h1>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search dishes..."
            className="w-1/3 p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
          />
        </div>

        {/* Dish List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedDishes.length > 0 ? (
            paginatedDishes.map((dish) => (
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
            ))
          ) : (
            <div className="col-span-3 text-center text-white text-xl">
              No dishes available for your search
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center items-center space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              {index + 1}
            </button>
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

      {/* Link to EagleAi page */}
      <Link to="/eagle-ai">
        <button className="fixed bottom-6 left-6 bg-green-600 text-white rounded-full p-5 shadow-lg hover:bg-green-700 text-3xl transition">
          AI
        </button>
      </Link>
    </div>
  );
};

export default Home;