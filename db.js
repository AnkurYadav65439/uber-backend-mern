import mongoose from "mongoose";

export default function connectToDb(){
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(()=>{
        console.log("Database connected successfully");
    })
    .catch((err)=>console.log(err));
}