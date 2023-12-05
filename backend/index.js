require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose'); 

const app = express();

const PORT = process.env.PORT || 10000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser : true,
  useUnifiedTopology: true
}).then(()=>{
  console.log(`server running on port : ${PORT}`);
}).catch((err)=>{
  console.log(`${err} didn't connect !`);
})
