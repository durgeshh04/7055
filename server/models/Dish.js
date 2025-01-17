import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema({
    dishname: {
        type: String,
        required: true,
        trim: true,
    },
    ingredients: [{
        name: { type: String, required: true },
        calories: { type: Number, required: true }
    }],
    quantity: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

const Dish = mongoose.model('Dish', dishSchema);
export default Dish;
