import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/error.js';
import userRoutes from './routes/userRoutes.js';
import vaultRoutes from './routes/vaultRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes initialization
app.use('/api/users', userRoutes);
app.use('/api/vaults', vaultRoutes);

app.use(errorHandler);
connectDB();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
