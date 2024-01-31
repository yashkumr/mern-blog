import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import authRoute from "./routes/authRoute.js"
import connectDB from "../config/db.js";


dotenv.config();

connectDB();


const app  = express();

app.use(express.json());

app.use("/api/v1/auth", authRoute);

app.listen(3000, ()=>{
    console.log("server is running on port 3000");
})
