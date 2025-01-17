import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({limit: '1mb'}));
app.use(cors());


app.get('/', (req, res) => {
    res.status(200).json({message: 'server running'});
})

app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}`);
})