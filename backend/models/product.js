import mongoose from "mongoose";

const Schema = mongoose.Schema;
const productSchema = new Schema({
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
  rating:{
    type:Number,
    required:true,
  },
  availableQuantity: Number,
  images: [
    {
      type: String
    }
  ]
});

const ProductModel = mongoose.model("product", productSchema);
export default ProductModel