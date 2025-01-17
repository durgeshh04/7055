import Dish from "../models/Dish.js";

export const createDish = async (req, res) => {
    const { dishname, ingredients, quantity } = req.body;

    try {
        if (!dishname || !ingredients || !quantity) {
            return res.status(400).json({ message: 'Provide all details' });
        }

        const newDish = new Dish({
            dishname,
            ingredients,
            quantity
        });

        await newDish.save();
        res.status(201).json({ message: 'Dish added successfully', dish: newDish });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.status(200).json({ message: "Dishes fetched successfully!", data: dishes });
    } catch (error) {
        res.status(500).json({ message: "Error fetching dishes", error: error.message });
    }
};

export const getById = async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }
        res.status(200).json({ data: dish });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch dish details', error: error.message });
    }
};

export const updateDish = async (req, res) => {
    const { id } = req.params;
    const { dishname, ingredients, quantity } = req.body;

    try {
        const updateData = { dishname, ingredients, quantity };

        const updatedDish = await Dish.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedDish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        res.status(200).json({ message: 'Dish updated successfully', dish: updatedDish });
    } catch (error) {
        res.status(500).json({ message: 'Error updating dish', error: error.message });
    }
};

export const deleteDish = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedDish = await Dish.findByIdAndDelete(id);

        if (!deletedDish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        res.status(200).json({ message: 'Dish deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting dish', error: error.message });
    }
};
