import mongoose from "mongoose";
export const connectDB = async ()=>{
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully");
}