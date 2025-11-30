import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import userRoutes from './routes/user.js';

config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Client origin
  credentials: true, // Enable credentials (cookies, authorization headers)
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Database connection
mongoose
  .connect('mongodb://localhost:27017/Tax-Regime')
  .then((conn) => console.log(`Database connected: ${conn.connection.host}`))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/v1/users', userRoutes);

app.use('/ping', (req, res) => {
  res.send('pong');
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).send('Oops! Page not found');
});

// Start server
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
