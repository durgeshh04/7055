import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';

dotenv.config();

// database files
import connectDB from './config/db.js';
import dishRouter from './routes/dishRoutes.js';

// middlewares
import errorHandler from './middlewares/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(express.json({limit: '1mb'}));
app.use(cors());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();

app.use('/api/dishes', dishRouter);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).json({message: 'server running'});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
