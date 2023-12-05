import dotenv from 'dotenv'
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import itemRoutes from "./routes/items.js"

dotenv.config()

const app = express();

const PORT = process.env.PORT || 10000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/items", itemRoutes)


mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser : true,
  useUnifiedTopology: true
}).then(()=>{
  console.log(`server running on port : ${PORT}`);
}).catch((err)=>{
  console.log(`${err} didn't connect !`);
})
