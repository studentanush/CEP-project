import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import { ngoRouter, router } from "./routes/authRouter.js";
import { connectDB } from "./connectDB.js";

dotenv.config();
const PORT = process.env.PORT || 8080;

console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);


const app = express();
app.use(express.json());
app.use(cors())
connectDB();
app.use("/auth",router);
app.use("/ngo",ngoRouter);
app.listen(PORT,()=>{
    console.log("Server running on port : "+PORT);
})