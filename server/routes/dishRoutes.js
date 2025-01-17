import express from 'express';
import upload from '../middlewares/upload.js';
import { 
    createDish, 
    getAllDishes, 
    updateDish, 
    deleteDish, 
    getById
} from '../controllers/dishController.js';

const dishRouter = express.Router();

dishRouter.post('/', upload.single('img'), createDish);

dishRouter.get('/', getAllDishes);

dishRouter.get('/:id', getById);

dishRouter.put('/:id', upload.single('img'), updateDish);

dishRouter.delete('/:id', deleteDish);

export default dishRouter;