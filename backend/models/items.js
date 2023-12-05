import mongoose from "mongoose";
import CategoryData from "../models/Category.js";

const Schema = mongoose.Schema;
const itemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price:{
    type:Number,
    required:true,
  },
//   media: {
//     type: [String],
//     required: true,
//   },
});

module.exports = mongoose.model("items", itemSchema);