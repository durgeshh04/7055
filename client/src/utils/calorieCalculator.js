export const calculateCalories = (ingredients, quantities) => {
    return ingredients.reduce(
      (total, ingredient, idx) => total + (ingredient.calories || 0) * (quantities[idx] || 1),
      0
    );
  };
  