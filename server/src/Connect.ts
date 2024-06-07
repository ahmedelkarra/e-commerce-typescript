import mongoose from "mongoose";
import { Router } from "express";
import dotenv from "dotenv";
dotenv.config()


const Connect = () => {
    const PORT:any = process.env.URL_DATA_BASE
    try {
        mongoose.connect(PORT)
        console.log('Database has been connected');
    } catch (error) {
        console.log('Failed to connect to database');
    }
}


export default Connect