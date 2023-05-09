import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Import routes
import categoryRoutes from './routes/categoryRoute.js'

const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Set the port
const port = process.env.PORT || 5000;

// Use middleware to parse request bodies and enable CORS
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.use('/api/category', categoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong";
  return res.status(errStatus).json({
    success: false,
    message: errMessage,
    stack: err.stack,
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
