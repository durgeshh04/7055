import express from 'express';
import { createDish, getAllDishes, updateDish, deleteDish, getById } from '../controllers/dishController.js';

const dishRouter = express.Router();

dishRouter.post('/', createDish);
dishRouter.get('/', getAllDishes);
dishRouter.get('/:id', getById);
dishRouter.put('/:id', updateDish);
dishRouter.delete('/:id', deleteDish);

export default dishRouter;
