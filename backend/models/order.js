import mongoose from "mongoose";

const Schema = mongoose.Schema;
const orderSchema = new Schema({
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
  media: {
    type: [String],
    required: true,
  },
});

const Item = mongoose.model("items", itemSchema);
export default Item