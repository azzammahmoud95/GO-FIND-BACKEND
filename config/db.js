import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.set("strictQuery", true);

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName:process.env.DB_NAME,
    })
    .then(() => {
      console.log("Connected to mongoDB");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};

// Connection error handling
mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDb disconnected!");
})
mongoose.connection.on("connected", ()=>{
    console.log("mongoDb connected!");
})

export default connectDB;