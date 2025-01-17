import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
    dishname: {
        type: String,
        required: true,
        trim: true,
    },

    ingredients: {
        type: [String],
        required: true
    },

    quantity: {
        type: Number,
        required: true,
    },

    img: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Dish = mongoose.model('Dish', dishSchema);
export default Dish;