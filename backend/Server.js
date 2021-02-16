import express from "express";
import cors from "cors";
//import pusher from "pusher";
import mongoose from "mongoose";
import userRouter from "./api/routes/userRouter.js";
import dotenv from "dotenv";

// app Config
const app = express();
const port =  process.env.PORT || 5000;

dotenv.config();

// middlewares
app.use(express.json());
app.use(cors());


// DataBase Config

//const  connection_url = 'mongodb+srv://soen341:soen341@cluster0.0nasy.mongodb.net/Soen341DB?retryWrites=true&w=majority';

mongoose.connect(process.env.CONNECTION_URL, {useCreateIndex : true , useNewUrlParser: true , useUnifiedTopology: true});
mongoose.connection.once('open', ()=>{
    console.log("MongoDB connection established successfully");
})

// app routes
app.get("/" ,(req,res)=>{
    console.log("server is running ");

    res.send("hello world");
});

app.use("/users" , userRouter);



// app listener
app.listen(port, ()=>{
    console.log("server is running on port "+ port)
})


