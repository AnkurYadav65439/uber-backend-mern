import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import connectToDb from "./db.js";
dotenv.config();

connectToDb();

const app = express();

app.use(cors());   //todo: actual domain

app.get('/', (req, res)=>{
    res.send("hello aplication again");
});

export default app;

