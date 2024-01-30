import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv'
import mongoose from 'mongoose'; 
import {authRoute} from "../server/routes/auth.js"
dotenv.config();

const app=express();
const connect=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO)
    } catch (error) {
        throw error;
    }
}


app.use(cors());
app.use(express.json())
app.use(morgan("dev"))
app.use("/api/v1/user", authRoute);
const PORT = 8080;


mongoose.connection.on("connected",()=>{
    console.log("Mongo Connected")
})

mongoose.connection.on("disconnected",()=>{
    console.log("Mongo Not Connected")
})

app.listen(PORT,()=>{
    connect();
    console.log(`app is running at port ${PORT}`)
})