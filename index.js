import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
// Import routes
import categoryRoutes from './routes/categoryRoute.js';
import userRoutes from './routes/userRoute.js'
import itemRoutes from './routes/itemRoute.js'
import bodyParser from 'body-parser';
import locationRoute from './routes/locationRoute.js'
const app = express();

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Set the port
const port = process.env.PORT || 5000;

// Use middleware to parse request bodies and enable CORS
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/uploads", express.static("./uploads"));

app.use('/api/category', categoryRoutes);
app.use('/api/user', userRoutes)
app.use('/api/item',itemRoutes);
app.use('/api/location', locationRoute)
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
