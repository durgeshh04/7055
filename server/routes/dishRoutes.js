import express from 'express';
import upload from '../middlewares/upload.js';
import { 
    createDish, 
    getAllDishes, 
    updateDish, 
    deleteDish 
} from '../controllers/dishController.js';

const dishRouter = express.Router();

dishRouter.post('/', upload.single('img'), createDish);

dishRouter.get('/', getAllDishes);

dishRouter.put('/:id', upload.single('img'), updateDish);

dishRouter.delete('/:id', deleteDish);

export default dishRouter;