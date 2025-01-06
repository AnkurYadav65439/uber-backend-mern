import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import connectToDb from "./db.js";
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js"; 
import cookieParser from "cookie-parser";
dotenv.config();

connectToDb();

const app = express();

app.use(cors());   //todo: actual domain
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());     //middleware for cookies

app.get('/', (req, res)=>{
    res.send("hello uber clone aplication");
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

export default app;

