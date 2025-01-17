const DishList = ({ dishes }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dishes.map((dish) => (
          <div
            key={dish._id}
            className="bg-gray-800 p-6 rounded-lg shadow text-center hover:bg-gray-700 transition"
          >
            <h2 className="text-xl font-bold">{dish.dishname}</h2>
            <p className="text-gray-400">{dish.ingredients.length} Ingredients</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default DishList;
  