import express from 'express';
import { createDish, getAllDishes, updateDish, deleteDish, getById } from '../controllers/dishController.js';
import { getDishSuggestions } from '../controllers/aiController.js';  // Import AI controller

const dishRouter = express.Router();

dishRouter.post('/', createDish);
dishRouter.get('/', getAllDishes);
dishRouter.get('/:id', getById);
dishRouter.put('/:id', updateDish);
dishRouter.delete('/:id', deleteDish);
dishRouter.post('/suggest', getDishSuggestions); 

export default dishRouter;
